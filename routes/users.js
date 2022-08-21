const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const { checkAuthenticated } = require('../passport-config')

//Handle GET (READ) requests for the individual user dashboard
router.get('/:id/dashboard', checkAuthenticated, usersController.getUserDashboard)

module.exports = router