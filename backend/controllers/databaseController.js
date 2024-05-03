const User = require('../models/userModel')
const UserDetails = require('../models/userDetailsModel')

const getUsers = async (req, res) => {
    const page = req.query.page

    try {
        const totalUsers = await User.countDocuments({})

        const users = await User.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * 30)
            .limit(30)
            .select('_id email booked createdAt lastOnline')


        res.status(200).json({ totalUsers, users })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getMatchingUser = async (req, res) => {
    const searchUser = req.query.user
    const returnedNumUser = req.query.returnedNumUser
    const page = req.query.page

    try {
        const matching = await User.find({ email: { $regex: `^${searchUser}`, $options: 'i' } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * returnedNumUser)
            .limit(returnedNumUser)
            .select('_id email booked createdAt lastOnline')

        const totalUsers = await User.countDocuments({ email: { $regex: `^${searchUser}`, $options: 'i' } })

        matching.length == 0 ? res.status(200).json({ matching: "No User Found", totalUsers }) : res.status(200).json({ matching, totalUsers })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addUserDetails = async (req, res) => {
    const { _id, name, age, sex, address, contact } = req.body

    try {
        const exist = await UserDetails.findOne({ userId: _id })

        if (exist) {
            throw Error("user already have details")
        }

        const userDetails = await UserDetails.create({ name, age, sex, address, contactNumber: contact, userId: _id })

        res.status(200).json(userDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserDetails = async (req, res) => {
    const { _id } = req.query
    try {
        const userDetails = await UserDetails.find({ userId: _id })

        res.status(200).json(userDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateUserDetails = async (req, res) => {
    const { _id, name, age, sex, address, contact } = req.body
    console.log(name)
    try {
        const userDetails = await UserDetails.findOneAndUpdate({ userId: _id }, { name, age, sex, address, contactNumber: contact }, { new: true })

        res.status(200).json(userDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getUsers,
    getMatchingUser,
    getUserDetails,
    addUserDetails,
    updateUserDetails
}