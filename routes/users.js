const express = require('express')
const router = express.Router()
const Dish = require("../models/Dish")

//Handle GET (READ) requests for the individual user dashboard
//I want this endpoint to be /users/:id, but I don't know how to set that up right yet...
router.get('/', async (request, response) => {

    //query the database to find all the dishes documents, and put them into an array
    const dishes = await Dish.find()

    //query the database to find all the dishes documents, and put them into an array
    // const dishes = await Dish.find({ userId: request.body.userId})

    //render the dashboard.ejs file for this user, passing in dishes as variable
    response.render('dashboard.ejs', { dishes, title: 'Skillet List | Dashboard' })
})

module.exports = router