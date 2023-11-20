const mongoose = require('mongoose');

const APISchema = new mongoose.Schema({
    api: {
        type: String,
        required: [true, "Please enter value for API key!"],
        unique: [true, "API Key Already Exist"],
    },
    status: {
        type: String,
        required: [true, "Please select a Status!"],
    },
    products: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Boolean,
        default: false
    },
    files: {
        type: Boolean,
        default: false
    },
    clients: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('API', APISchema)
