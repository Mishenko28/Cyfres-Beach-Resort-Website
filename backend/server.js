const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const databaseRoutes = require('./routes/databaseRoutes')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173, https://cyfres-beach-resort.onrender.com, https://cyfres-beach-resort-admin.onrender.com')
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

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/database', databaseRoutes)

mongoose.connect('mongodb+srv://johnthomasalog:thomas121323@cyfres.ji2xnew.mongodb.net/Cyfres')
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })