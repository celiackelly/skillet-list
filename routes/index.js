const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { checkAuthenticated } = require('../passport-config')
const { checkNotAuthenticated } = require('../passport-config')

//GET home page (index.ejs)
router.get('/', homeController.getIndex)

//GET sign-up page
router.get('/sign-up', homeController.getSignUp)

//GET login page
router.get('/login', homeController.getLogin)

//POST to /sign-up to create an account
router.post('/sign-up', checkNotAuthenticated, homeController.createUserAccount)

//POST to /login to login (authenticate) a user
router.post('/login', checkNotAuthenticated, homeController.login)

//Handle DELETE requests to the /logout route - to logout/deauthenticate a use
//Custom middleware in server.js handles overriding the link's GET method
router.delete('/logout', checkAuthenticated, homeController.logout)

module.exports = router