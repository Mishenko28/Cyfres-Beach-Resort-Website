const mongoose = require('mongoose')

module.exports = mongoose.model('Gallery', new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}), 'gallery')