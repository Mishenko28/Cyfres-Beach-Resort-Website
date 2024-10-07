const User = require('../models/userModel')
const UserDetails = require('../models/userDetailsModel')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKENPASSWORD, { expiresIn: '1d' })
}


const loginUser = async (req, res) => {
    const { email, password } = await req.body
    const lastOnline = new Date()

    try {
        const user = await User.findOneAndUpdate({ email }, { lastOnline })

        if (!user) {
            throw Error("Email is not registered")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Incorrect password")
        }

        const token = createToken(user._id)

        res.status(200).json({ email, token, _id: user._id })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password } = await req.body

    try {
        const exist = await User.findOne({ email })

        if (exist) {
            throw Error("Email already exist")
        }
        if (!validator.isEmail(email)) {
            throw Error("email is not valid")
        }
        if (!validator.isStrongPassword(password, { minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
            throw Error("password must atleast 8 characters")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, password: hash })

        const token = createToken(user._id)

        res.status(200).json({ email, token, _id: user._id })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    const page = req.query.page

    try {
        const totalUsers = await User.countDocuments({})

        const users = await User.find({})
            .sort({ lastOnline: -1 })
            .skip((page - 1) * 30)
            .limit(30)
            .select('_id email details createdAt lastOnline')


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
        const matching = await User.find({ email: { $regex: `${searchUser}`, $options: 'i' } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * returnedNumUser)
            .limit(returnedNumUser)
            .select('_id email details createdAt lastOnline')

        const totalUsers = await User.countDocuments({ email: { $regex: `${searchUser}`, $options: 'i' } })

        matching.length == 0 ? res.status(200).json({ matching: "No User Found", totalUsers }) : res.status(200).json({ matching, totalUsers })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addUserDetails = async (req, res) => {
    const { _id, email, name, age, sex, address, contact } = req.body

    try {
        const exist = await UserDetails.findOne({ userId: _id })

        if (exist) {
            throw Error("user already have details")
        }

        await User.findOneAndUpdate({ _id }, { details: true })
        const userDetails = await UserDetails.create({ name, age, sex, address, contactNumber: contact, email, userId: _id })

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

    try {
        const userDetails = await UserDetails.findOneAndUpdate({ userId: _id }, { name, age, sex, address, contactNumber: contact }, { new: true })

        res.status(200).json(userDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    getMatchingUser,
    getUsers,
    addUserDetails,
    getUserDetails,
    updateUserDetails
}
