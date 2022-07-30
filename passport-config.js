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