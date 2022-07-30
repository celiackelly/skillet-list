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




// // Handle PUT (UPDATE) requests to the /dishes/:id 
// // Triggered when utensil btn is clicked on front end (to mark as cooked), or when edit modal is submitted (to edit info)
// router.put('/:id', async (request, response) => {

//     // In the db 'dishes' collection, find the document by _id and update it
//     const dishId = request.params.id
//     const updateAction = request.body.updateAction
//     try {
//         if (updateAction === 'markCooked') {
//             const result = await db.get().collection('dishes').updateOne({_id: ObjectId(dishId)},{
//                 $set: {
//                     cooked: true
//                 }
//             },{
//                 upsert: false  
//             })
//         }
//         if (updateAction === 'editDishInfo') {
//             const result = await db.get().collection('dishes').updateOne({_id: ObjectId(dishId)},{
//                 $set: {
//                     dishName: request.body.dishNameFromJS, 
//                     meal: request.body.mealFromJS, 
//                     recipeLink: request.body.recipeLinkFromJS
//                 }
//             },{
//                 upsert: false 
//             })
//         }
//         console.log(`Dish Updated: ${updateAction}`)
//         response.json(`Dish Updated: ${updateAction}`)
//     } catch(err) {
//         console.log(err)
//     }
// })

module.exports = router