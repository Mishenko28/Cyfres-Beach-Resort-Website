const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKENPASSWORD, { expiresIn: '1d' })
}


const loginUser = async (req, res) => {
    const { email, password } = await req.body

    try {
        const user = await User.findOne({email})

        if (!user) {
            throw Error("Email is not registered")
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error("Incorrect password")
        }

        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const { email, password } = await req.body

    try {
        const exist = await User.findOne({email})
        
        if (exist) {
            throw Error("Email already exist")
        }
        if (!validator.isEmail(email)) {
            throw Error("email is not valid")
        }
        if (!validator.isStrongPassword(password, {minUppercase: 0, minNumbers: 0, minSymbols: 0})) {
            throw Error("password must atleast 8 characters")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({email, password: hash})

        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}
