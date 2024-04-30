const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    try {
        jwt.verify(token, process.env.TOKENPASSWORD)
        next()
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = adminAuth