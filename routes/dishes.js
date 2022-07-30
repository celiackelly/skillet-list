const express = require('express')
const router = express.Router()
const db = require('../db')
const { ObjectId } = require('mongodb') 

//Handle POST (CREATE) requests on the dishes route 
router.post('/', (request, response) => {
    //Add new a document to the db. 
    db.get().collection('dishes').insertOne({
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

//Handle DELETE (DELETE) requests on the /dishes/:id
// Triggered when red X delete btn is clicked on front end
router.delete('/:id', (request, response) => {
    
    //Find the item in the 'dishes' collection where _id matches request.body and delete it
    const dishId = request.params.id
    db.get().collection('dishes').deleteOne({_id: ObjectId(dishId)})
    .then(result => {
        console.log('Dish Deleted')
        response.json('Dish Deleted')
    })
    //catch any errors and log them
    .catch(error => console.error(error))
})

// Handle PUT (UPDATE) requests to the /dishes/:id 
// Triggered when utensil btn is clicked on front end (to mark as cooked), or when edit modal is submitted (to edit info)
router.put('/:id', (request, response) => {

    // In the db 'dishes' collection, find the document by _id and update it
    const dishId = request.params.id

    if (request.body.cooked) {
        db.get().collection('dishes').updateOne({_id: ObjectId(dishId)},{
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
    } else {
        db.get().collection('dishes').updateOne({_id: ObjectId(dishId)},{
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

    }
})


// //NOTHING TRIGGERS THIS RIGHT NOW
// //Handle PUT (UPDATE) requests to the /markNotCooked route
// //Triggered when a cooked dish is clicked on the front end
// //Do the opposite of the /markComplete route
// router.put('/markNotCooked', (request, response) => {

//     const dishId = request.params.id

//     // In the db 'dishes' collection, find the document by _id and update it
//     db.get().collection('dishes').updateOne({_id: ObjectId(dishId)},{
//         $set: {
//             cooked: false  //set the value of 'completed' to false
//           }
//     },{
//         upsert: false  // Doesn't create a new document if the query doesn't find a matching document
//     })
//     .then(result => {
//         //If successful, log to the console and send 'Marked Uncomplete' response to the front end
//         console.log('Marked Not Cooked')
//         response.json('Marked Not Cooked')
//     })
//     .catch(error => console.error(error))
// })

module.exports = router