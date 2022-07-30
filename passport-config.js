const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')

exports.localStrategy = passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: 'No user with that email.'})
            }
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    //passwords match! user logins 
                    return done(null, user)
                } else {
                    //passwords do not match 
                    return done(null, false, {message: 'Incorrect password'})
                }
            })
        })
    })
)

exports.serializeUser = passport.serializeUser(function(user, done) {
    done(null, user.id)
})

exports.deserializeUser = passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user)
    })
})

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
}


/*
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initializePassport(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        //done = the function to call when done with this function
        //Look for a user by email. If not found, call done function w/error message
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
            //1st param - error (null), 2nd param - matching user? (false)
        }
        try {
            console.log(user)
            console.log(password, user.password)
            if (await bcrypt.compare(password, user.password)) {
                //Password matches user password- successful authentication
                //call the done function with no error and the authenticated user
                return done(null, user)
            } else {
                //Passwords do not match
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch(err) {
            return done(err)
        } 
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initializePassport

*/