const express = require('express')
const router = express.Router()

//Handle POST (CREATE) requests on the dishes route 
router.post('/dishes', (request, response) => {
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

module.exports = router