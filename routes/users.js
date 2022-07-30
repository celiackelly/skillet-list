const express = require('express')
const router = express.Router()
const Dish = require('../models/Dish')
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Handle GET (READ) requests for the individual user dashboard
//I want this endpoint to be /users/:id, but I don't know how to set that up right yet...
router.get('/:id/dashboard', async (request, response) => {

    const user = await User.findById(request.params.id)

    // query the database to find all the dishes documents for THIS USER
    const dishes = await Dish.find({ userId: user._id})

    //render the dashboard.ejs file for this user, passing in dishes as variable
    response.render('users/dashboard.ejs', { dishes : dishes, title: 'Skillet List | Dashboard' })
})

module.exports = router