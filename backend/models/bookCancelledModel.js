const mongoose = require('mongoose')

module.exports = mongoose.model('BookCancelled', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    book: {
        type: Object,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Cancelled"
    }
}, { timestamps: true }), 'book-cancelled')