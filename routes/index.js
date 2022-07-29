const express = require('express')
const router = express.Router()
const db = require('../db')

//Handle GET (READ) requests to the main route
router.get('/', async (request, response)=>{
    //query the database to find all the dishes documents, and put them into an array
    const dishes = await db.get().collection('dishes').find().toArray()  

    //render the index.ejs file, passing in dishes as variable
    response.render('index.ejs', { dishes })

    //pass in the title
    //res.render('course', { title: 'Course', course, studentNames })

})

module.exports = router