// Import Express package and assign to variable
const express = require('express')
//Create Express application
const app = express()
const PORT = 2121
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

const { db, connectDB } = require('./db')
connectDB()

const indexRouter = require('./routes/index')
const dishesRouter = require('./routes/dishes')

app.set('view engine', 'ejs')  //Set up app to use EJS as the HTML templating language
app.set('layout', './layouts/layout')

app.use(express.static('public'))  //Set up public folder to serve CSS, JS, and image files
app.use(express.urlencoded({ extended: true })) // Use Express' built-in middleware to parse incoming requests with urlencoded payloads 
app.use(express.json()) //Use Express' json parser middleware
app.use(expressLayouts)

app.use('/', indexRouter)
app.use('/dishes', dishesRouter)

//Set up the server to listen on our port (if it's defined in .env), or whatever the port is
app.listen(process.env.PORT || PORT, ()=>{
    //If successful, log message to console
    console.log(`Server running on port ${PORT}`)
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

