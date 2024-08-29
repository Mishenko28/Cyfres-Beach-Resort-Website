const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    getAccommodations,
    getAccommodation,
    addAccommodation,
    editAccommodation,
    deleteAccommodation
} = require('../controllers/accommodationController')

router.use(auth)

router.get('/all', getAccommodations)
router.get('/single', getAccommodation)

router.post('/', addAccommodation)
router.patch('/', editAccommodation)
router.delete('/', deleteAccommodation)

module.exports = router