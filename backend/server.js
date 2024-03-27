const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
  
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

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