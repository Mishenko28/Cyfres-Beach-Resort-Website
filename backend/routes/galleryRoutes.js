const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    getGalleries,
    getGallery,
    addGallery,
    editGallery,
    deleteGallery
} = require('../controllers/galleryController')

router.use(auth)

router.get('/all', getGalleries)
router.get('/single', getGallery)

router.post('/', addGallery)
router.patch('/', editGallery)
router.delete('/', deleteGallery)

module.exports = router