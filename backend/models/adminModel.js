const mongoose = require('mongoose')

module.exports = mongoose.model('Admin', new mongoose.Schema({
    admin: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }), 'admins')