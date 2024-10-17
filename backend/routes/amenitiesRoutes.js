const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    getAmenities,
    getAmenity,
    addAmenity,
    editAmenity,
    deleteAmenity
} = require('../controllers/amenitiesController')

router.use(auth)

router.get('/all', getAmenities)
router.get('/single', getAmenity)

router.post('/', addAmenity)
router.patch('/', editAmenity)
router.delete('/', deleteAmenity)

module.exports = router