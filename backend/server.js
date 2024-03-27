const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()


mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })