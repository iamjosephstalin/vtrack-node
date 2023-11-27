const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc');

const machineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a Name!"],
    },
    active: {
        type: String,
        required: [true, "Please select a Status!"],
    },
    end_machine: {
        type: String,
    },
    notes: {
        type: String,
    },
    price: {
        type: Number,
    },
    currency: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Currency'
    },
    shift: {
        type: Number,
    },
    hour: {
        type: Number,
    },
    order: {
        type: Number,
        unique: false 
    }});

machineSchema.plugin(autoIncrement.autoIncrement, {
    model: 'machine',
    field: 'order',
    startAt: 1,
  });

module.exports = mongoose.model('machine', machineSchema)
