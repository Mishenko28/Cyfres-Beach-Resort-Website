const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        type: Boolean,
        default: false
    },
    lastOnline: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }), 'users')