// Import Express package and assign to variable
const express = require('express')
//Create Express application
const app = express()
const PORT = 2121
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

const db = require('./db')
db.connect()

const indexRouter = require('./routes/index')
const dishesRouter = require('./routes/dishes')

app.set('view engine', 'ejs')  //Set up app to use EJS as the HTML templating language
app.set('layout', './layouts/layout')

app.use(express.static('public'))  //Set up public folder to serve CSS, JS, and image files
app.use(express.urlencoded({ extended: true })) // Use Express' built-in middleware to parse incoming requests with urlencoded payloads 
app.use(express.json()) //Use Express' json parser middleware
app.use(expressLayouts)

app.use('/', indexRouter)
app.use('/dishes', dishesRouter)

//Set up the server to listen on our port (if it's defined in .env), or whatever the port is
app.listen(process.env.PORT || PORT, ()=>{
    //If successful, log message to console
    console.log(`Server running on port ${PORT}`)
})