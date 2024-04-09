const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKENPASSWORD, { expiresIn: '8h' })
}

const loginAdmin = async (req, res) => {
    const { admin, password } = await req.body

    try {
        const adminUser = await Admin.findOne({admin})

        if (!adminUser) {
            throw Error("Admin not Found")
        }

        const match = await bcrypt.compare(password, adminUser.password)

        if (!match) {
            throw Error("Incorrect password")
        }

        const token = createToken(adminUser._id)

        res.status(200).json({admin, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const addNewAdmin = async (req, res) => {
    const { admin, password } = await req.body

    try {
        const exist = await Admin.findOne({admin})
        
        if (exist) {
            throw Error("Admin already exist")
        }
        if (admin.length < 8) {
            throw Error("Admin must atleast 8 characters")
        }
        if (!validator.isStrongPassword(password, {minUppercase: 0, minNumbers: 0, minSymbols: 0})) {
            throw Error("password must atleast 8 characters")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await Admin.create({admin, password: hash})

        const token = createToken(admin._id)

        res.status(200).json({admin, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginAdmin,
    addNewAdmin
}