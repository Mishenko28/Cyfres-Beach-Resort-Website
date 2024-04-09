const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const {
    getUsers,
    getMatchingUser
} = require('../controllers/databaseController')

router.use(adminAuth)

router.get('/users', getUsers)
router.get('/users/search', getMatchingUser)

module.exports = router