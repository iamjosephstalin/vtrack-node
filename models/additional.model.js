const mongoose = require('mongoose');

const AddSchema = new mongoose.Schema({
    assigned: {
        type: String,
        required: [true, "Please select a value!"],
    },
    group: {
        type: String,
        required: [true, "Please select a Group!"],
    },
    field: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('additional', AddSchema)
