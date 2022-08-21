const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcrypt')

module.exports = {
    getIndex: async (request, response)=>{

        //render the index.ejs file
        response.render('index.ejs', { title: 'Skillet List | Home' })
    },

    getSignUp: async (request, response)=>{

        //render the sign-up.ejs file
        response.render('sign-up.ejs', { title: 'Skillet List | Sign up' })
    }, 

    getLogin: async (request, response)=>{

        //render the login.ejs file
        response.render('login.ejs', { title: 'Skillet List | Login' })
    }, 

    createUserAccount: async (request, response) => {
        try {
            const hashedPassword = await bcrypt.hash(request.body.password, 10)
            await User.create({
                email: request.body.email, 
                password: hashedPassword
            })
            console.log('User added')
            response.redirect('/login')
        } catch(err) {
            console.log(err)
            response.render('sign-up.ejs', {title: 'Skillet List | Sign up', errorMessage: 'Error: Please try again.'})
        }
    },

    login: (request, response, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err) }
            if (!user) {
              request.flash('errors', info)
              return response.redirect('/login')
            }
            request.logIn(user, (err) => {
              if (err) { return next(err) }
              request.flash('success', { msg: 'Success! You are logged in.' })
              response.redirect(`users/${request.user._id}/dashboard`)
            })
          })(request, response, next)
    }, 

    //This is the old function that worked before refactoring to use /controllers
    //Not sure why it won't work now, but the function above (from Blaw) works

    // passport.authenticate('local', {
    //     failureRedirect: '/login', 
    //     failureFlash: true
    // }), function (request, response) {
    //     response.redirect(`users/${request.user._id}/dashboard`)
    // }

    logout: async (request, response)=>{
        request.logOut(err => {
            if (err) { return next(err)}
        })
        response.redirect('/')
    }
}
