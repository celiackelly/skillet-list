const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    dishName: {
        type: String, 
        required: true
    }, 
    meal: {
        type: String, 
        required: true
    }, 
    recipeLink: {
        type: String, 
        required: false
    }, 
    cooked: {
        type: Boolean, 
        required: true, 
        default: false
    }
})

module.exports = mongoose.model('Dish', dishSchema)