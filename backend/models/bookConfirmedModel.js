const mongoose = require('mongoose')

module.exports = mongoose.model('BookConfirmed', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    question: {
        type: String,
    },
    slctRoom: {
        type: Array,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Confirmed"
    }
}, { timestamps: true }), 'book-confirmed')