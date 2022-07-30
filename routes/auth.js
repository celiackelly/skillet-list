const express = require('express')
const router = express.Router()

//Handle POST requests to the /auth route - to login/authenticate a user
router.post('/', async (request, response)=>{

    //FILL IN LATER
    response.send('auth post request')
})

//Handle DELETE requests to the /auth route - to logout/deauthenticate a user
router.post('/', async (request, response)=>{

    //FILL IN LATER
    response.send('auth delete request')
})

module.exports = router