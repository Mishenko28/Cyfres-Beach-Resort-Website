const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    getUsers,
    getMatchingUser,
    getUserDetails,
    addUserDetails,
    updateUserDetails,
    addBooking,
    getBookings,
    cancelBook
} = require('../controllers/databaseController')

router.use(auth)

router.get('/users', getUsers)
router.get('/users/search', getMatchingUser)

router.get('/user/details', getUserDetails)
router.post('/user/details', addUserDetails)
router.patch('/user/details', updateUserDetails)

router.post('/user/book', addBooking)
router.get('/user/book', getBookings)

router.post('/user/book-cancel', cancelBook)


module.exports = router