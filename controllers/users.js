const Dish = require('../models/Dish')
const User = require('../models/User')

module.exports = {
    getUserDashboard: async (request, response) => {
        //find the current user
        const user = await User.findById(request.params.id)
        // query the database to find all the dishes documents for THIS USER
        const dishes = await Dish.find({ userId: user._id})
        //render the dashboard.ejs file, passing in dishes as variable
        response.render('users/dashboard.ejs', { dishes, user, title: 'Skillet List | Dashboard' })
    }
}