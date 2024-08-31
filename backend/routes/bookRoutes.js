const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ongoingBooks = require('../middleware/ongoingBook')
const {
    addBooking,
    getBookings,
    cancelBook,
    getPendings,
    confirmBook,
    getCancelled,
    getConfirmed,
    editConfirmBook,
    getDate
} = require('../controllers/bookController')

router.use(auth)
router.use(ongoingBooks)

router.post('/add', addBooking)
router.get('/get', getBookings)

router.get('/get/pending', getPendings)
router.get('/get/cancel', getCancelled)
router.get('/get/confirm', getConfirmed)

router.post('/cancel', cancelBook)
router.post('/confirm', confirmBook)
router.post('/edit', editConfirmBook)
router.get('/date', getDate)


module.exports = router