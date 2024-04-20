const User = require('../models/userModel')

const getUsers = async (req, res) => {
    const page = req.query.page
    
    try {
        const totalUsers = await User.countDocuments({})
        
        const users = await User.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * 30)
            .limit(30)
            .select('_id email booked createdAt lastOnline')


        res.status(200).json({totalUsers, users})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getMatchingUser = async (req, res) => {
    const searchUser = req.query.user
    const returnedNumUser = req.query.returnedNumUser
    const page = req.query.page

    try {
        const matching = await User.find({ email: { $regex: `^${searchUser}`, $options: 'i' }})
            .sort({ createdAt: -1 })
            .skip((page - 1) * returnedNumUser)
            .limit(returnedNumUser)
            .select('email _id')
        
        const totalUsers = await User.countDocuments({ email: { $regex: `^${searchUser}`, $options: 'i' }})

        res.status(200).json({matching, totalUsers})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUsers,
    getMatchingUser
}