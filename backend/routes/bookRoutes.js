const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    addBooking,
    getBookings,
    cancelBook,
    getPendings,
    confirmBook
} = require('../controllers/bookController')

router.use(auth)

router.post('/add', addBooking)
router.get('/get', getBookings)

router.get('/get/pending', getPendings)

router.post('/cancel', cancelBook)
router.post('/confirm', confirmBook)


module.exports = router