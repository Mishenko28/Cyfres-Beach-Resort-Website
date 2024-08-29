const mongoose = require('mongoose')

module.exports = mongoose.model('Gallery', new mongoose.Schema({
    galleryName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}))