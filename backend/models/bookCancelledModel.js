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
    }
}, { timestamps: true }), 'book-cancelled')