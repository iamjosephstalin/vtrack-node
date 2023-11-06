const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter value for Unit Name!"],
        unique: [true, "Unit Name Already Exist"],
    },
    default: {
        type: String,
        default: "no"
    }
})

module.exports = mongoose.model('Unit', unitSchema)
