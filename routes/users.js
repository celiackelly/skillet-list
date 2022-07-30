const express = require('express')
const router = express.Router()
const Dish = require('../models/Dish')
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Handle GET (READ) requests for the individual user dashboard
//I want this endpoint to be /users/:id, but I don't know how to set that up right yet...
router.get('/dashboard', async (request, response) => {

    //query the database to find all the dishes documents
    const dishes = await Dish.find()

    //query the database to find all the dishes documents for THIS USER
    // const dishes = await Dish.find({ userId: request.body.userId})

    //render the dashboard.ejs file for this user, passing in dishes as variable
    response.render('dashboard.ejs', { dishes, title: 'Skillet List | Dashboard' })
})

//Sign up - post to /users to create an account
router.post('/', async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        await User.create({
            email: request.body.email, 
            password: hashedPassword
        })
        console.log('User added')
        response.redirect('/login')
    } catch(err) {
        console.log(err)
        response.render('sign-up.ejs', {title: 'Skillet List | Sign up', errorMessage: 'Error: Please try again.'})
    }
})

module.exports = router