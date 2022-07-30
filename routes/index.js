const express = require('express')
const router = express.Router()

//Handle GET (READ) requests to the main route
router.get('/', async (request, response)=>{

    //render the index.ejs file
    response.render('index.ejs', { title: 'Skillet List | Home' })
})

module.exports = router