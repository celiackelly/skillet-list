if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Import Express package and assign to variable
const express = require('express')
//Create Express application
const app = express()
const PORT = 2121
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
// const User = require('./models/User')

const connectDB = require('./db')
connectDB()
require('./passport-config')
// const initializePassport = require('./passport-config')
// initializePassport(
//     passport, 
//     email => User.findOne({email: email})
// )

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const dishesRouter = require('./routes/dishes')

app.set('view engine', 'ejs')  //Set up app to use EJS as the HTML templating language
app.set('layout', './layouts/layout')

app.use(express.static(path.join(__dirname, 'public'))) //Set up public folder to serve CSS, JS, and image files
app.use(express.urlencoded({ extended: true })) // Use Express' built-in middleware to parse incoming requests with urlencoded payloads 
app.use(express.json()) //Use Express' json parser middleware
app.use(expressLayouts)

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/dishes', dishesRouter)


app.use(passport.initialize())
app.use(passport.session())

//Set up the server to listen on our port (if it's defined in .env), or whatever the port is
app.listen(process.env.PORT || PORT, ()=>{
    //If successful, log message to console
    console.log(`Server running on port ${PORT}`)
})