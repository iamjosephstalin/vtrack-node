const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter value for Tag Name!"],
        unique: [true, "Tag Name Already Exist"],
    },
    color: {
        type: String,
        required: [true, "Please select a Colour!"],
        unique: [true, "Colour Code Already Exist"],
    }
})

module.exports = mongoose.model('Tag', tagSchema)
