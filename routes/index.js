const express = require('express')
const router = express.Router()
const Dish = require("../models/Dish")

//Handle GET (READ) requests to the main route
router.get('/', async (request, response)=>{
    //query the database to find all the dishes documents, and put them into an array
    const dishes = await Dish.find()

    //render the index.ejs file, passing in dishes as variable
    response.render('index.ejs', { dishes, title: 'Skillet List | Home' })
})

module.exports = router