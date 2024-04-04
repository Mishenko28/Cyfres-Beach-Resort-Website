const User = require('../models/userModel')

const getUsers = async (req, res) => {
    const page = req.query.page
    
    try {
        const totalUsers = await User.countDocuments({})
        
        const users = await User.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * 10)
            .limit(10)
            .select('_id email booked createdAt lastOnline')


        res.status(200).json({totalUsers, users})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getMatchingUser = async (req, res) => {
    const searchUser = req.query.user

    try {
        if (searchUser != "") {
            const matching = await User.find({ email: { $regex: `^${searchUser}`, $options: 'i' } })
                .sort({ createdAt: -1 })
                .limit(10)
                .select('email _id')
            res.status(200).json({matching})
        } else {
            res.status(200).json({matching: []})
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUsers,
    getMatchingUser
}