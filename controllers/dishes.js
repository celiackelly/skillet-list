const Dish = require('../models/Dish')

module.exports = {
    createDish: async (request, response) => {
        try {
            await Dish.create({
                dishName: request.body.dishName,
                meal: request.body.meal, 
                recipeLink: request.body.recipeLink,  
                cooked: false, 
                userId: request.user._id
            })
            console.log('Dish Added') 
            response.redirect(303, `/users/${request.user._id}/dashboard`)
        } catch(err) {
            console.log(err)
            response.redirect(303, '/')
        }
    },

    deleteDish: async (request, response) => {
        try {
            //Find the Dish where _id matches request.params.id and delete it
            await Dish.findByIdAndDelete(request.params.id)
            console.log('Dish Deleted')
            response.redirect(303, `/users/${request.user._id}/dashboard`)
        } catch(err) {
            console.log(err)
            response.redirect(303, `/users/${request.user._id}/dashboard`)
        }
    }, 

    updateDish: async (request, response) => {
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
            //By default, Express uses HTTP 302 for redirect, but this prevents PUT/POST requests from being redirected, 
            //so you have to set the code to 303
            //https://expressjs.com/en/api.html#res.redirect - also note the leading vs. trailing slashes
            response.redirect(303, `/users/${request.user._id}/dashboard`)
        } catch(err) {
            console.log(err)
            response.redirect(303, `/users/${request.user._id}/dashboard`)
        }
    },
}

