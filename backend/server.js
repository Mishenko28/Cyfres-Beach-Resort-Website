const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const databaseRoutes = require('./routes/bookRoutes')
const accommodationRoutes = require('./routes/accommodationRoutes')
const amenitiesRoutes = require('./routes/amenitiesRoutes')
const galleryRoutes = require('./routes/galleryRoutes')

const connectionString = 'mongodb+srv://johnthomasalog:thomas121323@cyfres.ji2xnew.mongodb.net/Cyfres'

// ATLAS           'mongodb+srv://johnthomasalog:thomas121323@cyfres.ji2xnew.mongodb.net/Cyfres'
// OFFLINE         'mongodb://localhost:27017/Cyfres'

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)

    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

app.use('/refresh-token', (req, res) => {
    const { authorization } = req.headers
    const oldToken = authorization.split(' ')[1]

    const { id } = jwt.decode(oldToken)
    const newToken = jwt.sign({ id }, process.env.TOKENPASSWORD, { expiresIn: '8h' })
    res.status(200).json({ newToken })
})

app.use('/admin', adminRoutes)
app.use('/user', authRoutes)
app.use('/book', databaseRoutes)
app.use('/accommodation', accommodationRoutes)
app.use('/amenities', amenitiesRoutes)
app.use('/gallery', galleryRoutes)

mongoose.connect(connectionString)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })