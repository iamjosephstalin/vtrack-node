const mongoose = require('mongoose');

const vatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter value for VAT Name!"],
        unique: [true, "VAT Name Already Exist"],
    }
})

module.exports = mongoose.model('VAT', vatSchema)
