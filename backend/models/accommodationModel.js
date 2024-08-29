const mongoose = require('mongoose')

module.exports = mongoose.model('Accomm', new mongoose.Schema({
    accommType: {
        type: String,
        required: true
    },
    accommName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    addPersonRate: {
        type: Number,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
}, { timestamps: true }), 'accommodations')