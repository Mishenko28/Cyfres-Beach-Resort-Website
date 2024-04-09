const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')

const adminAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        jwt.verify(token, process.env.TOKENPASSWORD)
        next()
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports = adminAuth