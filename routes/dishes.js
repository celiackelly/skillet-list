const express = require('express')
const router = express.Router()
const Dish = require('../models/Dish')

//Handle POST (CREATE) requests on the dishes route 
router.post('/', async (request, response) => {
    try {
        await Dish.create({
            dishName: request.body.dishName,
            meal: request.body.meal, 
            recipeLink: request.body.recipeLink,  
            cooked: false
        })
        console.log('Dish Added') 
        response.redirect('/')
    } catch(err) {
        console.log(err)
        response.render('/', {errorMessage: 'Error creating dish'})
    }
})

// //Handle DELETE (DELETE) requests on the /dishes/:id
// Triggered when red X delete btn is clicked on front end
router.delete('/:id', async (request, response) => {
    try {
        //Find the Dish where _id matches request.params.id and delete it
        await Dish.findByIdAndDelete(request.params.id)
        console.log('Dish Deleted')
        response.json('Dish Deleted')
    } catch(err) {
        console.log(error)
    }
})

// Handle PUT (UPDATE) requests to the /dishes/:id 
// Triggered when utensil btn is clicked on front end (to mark as cooked), or when edit modal is submitted (to edit info)
router.put('/:id', async (request, response) => {

    //Find the Dish where _id matches request.params.id and update it
    const updateAction = request.body.updateAction
    try {
        if (updateAction === 'markCooked') {
            await Dish.findByIdAndUpdate(request.params.id, {
                cooked: true
            }, {
                upsert: false, 
                runValidators: true
            })
        }
        if (updateAction === 'editDishInfo') {
            await Dish.findByIdAndUpdate(request.params.id, {
                dishName: request.body.dishNameFromJS, 
                meal: request.body.mealFromJS, 
                recipeLink: request.body.recipeLinkFromJS
            }, {
                upsert: false, 
                runValidators: true
            })
        }
        console.log(`Dish Updated: ${updateAction}`)
        response.json(`Dish Updated: ${updateAction}`)
    } catch(err) {
        console.log(err)
    }
})

module.exports = router