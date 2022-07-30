const express = require('express')
const router = express.Router()

//Handle GET (READ) requests to the main route
router.get('/', async (request, response)=>{

    //render the sign-up.ejs file
    response.render('sign-up.ejs', { title: 'Skillet List | Sign up' })
})

module.exports = router