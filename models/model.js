const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Role', roleSchema)
