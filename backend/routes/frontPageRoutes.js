const express = require('express')
const router = express.Router()

const {
    getAccommodations,
    getAmenities,
    getGalleries
} = require('../controllers/frontPageController')

router.get('/accommodations', getAccommodations)
router.get('/amenities', getAmenities)
router.get('/galleries', getGalleries)


module.exports = router