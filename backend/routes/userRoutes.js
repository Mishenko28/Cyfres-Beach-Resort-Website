const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const {
    loginUser,
    signupUser,
    getUsers,
    getMatchingUser,
    getUserDetails,
    addUserDetails,
    updateUserDetails
} = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/signup', signupUser)

router.use(auth)

router.get('/', getUsers)
router.get('/search', getMatchingUser)

router.get('/details', getUserDetails)
router.post('/details', addUserDetails)
router.patch('/details', updateUserDetails)

module.exports = router