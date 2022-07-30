const express = require('express')
const router = express.Router()

//Handle GET (READ) requests to the /login route
router.get('/', async (request, response)=>{

    //render the login.ejs file
    response.render('login.ejs', { title: 'Skillet List | Login' })
})

module.exports = router