// Import Express package and assign to variable
const express = require('express')
//Create Express application
const app = express()

//Import MongoDB library; destructure to get access to ObjectId 
const { MongoClient, ObjectId } = require('mongodb')
//Assign local port number
const PORT = 2121

//Configure .env file, so that you can import secrets 
require('dotenv').config()

//Declare database, connection string, database name
let db,  
    dbConnectionStr = process.env.DB_STRING,    //get db connection string from .env
    dbName = 'dishes'

//Connect to MongoDB database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`) //once successfully connected, log message in console
        db = client.db(dbName)  //assign the 'dishes' database to db variable
    })

app.set('view engine', 'ejs')  //Set up app to use EJS as the HTML templating language
app.use(express.static('public'))  //Set up public folder to serve CSS, JS, and image files
app.use(express.urlencoded({ extended: true })) // Use Express' built-in middleware to parse incoming requests with urlencoded payloads 
app.use(express.json()) //Use Express' json parser middleware

//Set up the server to listen on our port (if it's defined in .env), or whatever the port is
app.listen(process.env.PORT || PORT, ()=>{
    //If successful, log message to console
    console.log(`Server running on port ${PORT}`)
})

//Handle GET (READ) requests to the main route
app.get('/', async (request, response)=>{
    //query the database to find all the dishes documents, and put them into an array
    const dishes = await db.collection('dishes').find().toArray()  

    //render the index.ejs file, passing in dishes as variable
    response.render('index.ejs', { dishes })
})

//Handle POST (CREATE) requests on the dishes route 
app.post('/dishes', (request, response) => {
    //Add new a document to the db. 
    db.collection('dishes').insertOne({
        dishName: request.body.dishName,
        meal: request.body.meal, 
        recipeLink: request.body.recipeLink,  
        cooked: false
    })
    .then(result => {
        //If successful, log to the console and make a new GET request to reload the main route 
        console.log('Dish Added') 
        response.redirect('/')
    })
    .catch(error => console.error(error))  //If there's an error, log it
})

//Handle PUT (UPDATE) requests to the /markCooked route 
//Triggered when a dish is clicked on the front end
app.put('/markCooked', (request, response) => {
    // In the db 'dishes' collection, find the document by _id and update it
    db.collection('dishes').updateOne({_id: ObjectId(request.body.dishIDfromJS)},{
        //set the value of 'cooked' to true
        $set: {
            cooked: true
        }
    },{
        upsert: false  // Doesn't create a new document if the query doesn't find a matching document
    })
    .then(result => {
        //If successful, log to the console and send 'Marked Cooked' response to the front end
        console.log('Marked Cooked')
        //I think .json() also automatically sets the HTTP status code to 200 and the content-type to application/json, which is handy
        response.json('Marked Cooked')
    })
    //catch any errors and log them
    .catch(error => console.error(error))
})


//Handle PUT (UPDATE) requests to the /editDishInfo route 
//Triggered when a modal update btn is clicked on the front end
app.put('/editDishInfo', (request, response) => {
    // In the db 'dishes' collection, find the document by _id and update it
    db.collection('dishes').updateOne({_id: ObjectId(request.body.dishIDFromJS)},{
        //update the values based on input data from client side
        $set: {
            dishName: request.body.dishNameFromJS, 
            meal: request.body.mealFromJS, 
            recipeLink: request.body.recipeLinkFromJS
        }
    },{
        upsert: false  // Doesn't create a new document if the query doesn't find a matching document
    })
    .then(result => {
        //If successful, log to the console and send 'Marked Cooked' response to the front end
        console.log('Dish Updated')
        //I think .json() also automatically sets the HTTP status code to 200 and the content-type to application/json, which is handy
        response.json('Dish Updated')
    })
    //catch any errors and log them
    .catch(error => console.error(error))
})

//NOTHING TRIGGERS THIS RIGHT NOW
//Handle PUT (UPDATE) requests to the /markNotCooked route
//Triggered when a cooked dish is clicked on the front end
//Do the opposite of the /markComplete route
app.put('/markNotCooked', (request, response) => {
    // In the db 'dishes' collection, find the document by _id and update it
    db.collection('dishes').updateOne({_id: ObjectId(request.body.dishIDfromJS)},{
        $set: {
            cooked: false  //set the value of 'completed' to false
          }
    },{
        upsert: false  // Doesn't create a new document if the query doesn't find a matching document
    })
    .then(result => {
        //If successful, log to the console and send 'Marked Uncomplete' response to the front end
        console.log('Marked Not Cooked')
        response.json('Marked Not Cooked')
    })
    .catch(error => console.error(error))

})

//Handle DELETE (DELETE) requests to the /deleteItem route
app.delete('/deleteDish', (request, response) => {
    //Find the item in the 'dishes' collection where _id matches request.body and delete it
    db.collection('dishes').deleteOne({_id: ObjectId(request.body.dishIDFromJS)})
    .then(result => {
        console.log('Dish Deleted')
        response.json('Dish Deleted')
    })
    //catch any errors and log them
    .catch(error => console.error(error))

})

