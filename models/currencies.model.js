const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter value for Currency Name!"],
        unique: [true, "Currency Name Already Exist"],
    },
    default: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Currency', currencySchema)
