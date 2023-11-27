const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');

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
    },
    order: {
        type: Number,
        unique: false 
    }
});

AddSchema.plugin(autoIncrement.autoIncrement, {
    model: 'additional',
    field: 'order',
    startAt: 1,
  });

module.exports = mongoose.model('additional', AddSchema)
