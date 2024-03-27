const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)

mongoose.connect('mongodb://localhost:27017/Cyfres')
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })