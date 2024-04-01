const express = require('express')
const router = express.Router()

const {
    loginAdmin,
    addNewAdmin
} = require('../controllers/adminController')

router.post('/login', loginAdmin)
router.post('/add-new', addNewAdmin)

module.exports = router