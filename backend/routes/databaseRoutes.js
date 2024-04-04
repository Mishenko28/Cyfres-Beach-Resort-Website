const express = require('express')
const router = express.Router()

const {
    getUsers,
    getMatchingUser
} = require('../controllers/databaseController')

router.get('/users', getUsers)
router.get('/users/search', getMatchingUser)

module.exports = router