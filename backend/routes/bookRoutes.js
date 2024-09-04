const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    addBooking,
    getBookings,
    cancelBook,
    getPendings,
    confirmBook,
    getCancelled,
    getConfirmed,
    editConfirmBook,
    getOngoing,
    editOngoingBook
} = require('../controllers/bookController')

router.use(auth)

router.post('/add', addBooking)
router.get('/get', getBookings)

router.get('/get/pending', getPendings)
router.get('/get/cancel', getCancelled)
router.get('/get/confirm', getConfirmed)
router.get('/get/ongoing', getOngoing)

router.post('/cancel', cancelBook)
router.post('/confirm', confirmBook)
router.post('/edit/ongoing', editOngoingBook)
router.post('/edit/confirm', editConfirmBook)


module.exports = router