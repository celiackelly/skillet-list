const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../passport-config')
const dishesController = require('../controllers/dishes')

//POST to /dishes to create a dish 
router.post('/', checkAuthenticated, dishesController.createDish)

// DELETE /dishes/:id - Delete a dish
// Triggered when red X delete btn is clicked on front end
router.delete('/:id', checkAuthenticated, dishesController.deleteDish)

// PUT /dishes/:id - Update a dish
// Triggered when utensil btn is clicked on front end (to mark as cooked), or when edit modal is submitted (to edit info)
router.put('/:id', checkAuthenticated, dishesController.updateDish)

module.exports = router