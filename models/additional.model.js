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
        type: String,
        required: [true, "Please Enter the name of the field!"],
    }
})

module.exports = mongoose.model('additional', AddSchema)
