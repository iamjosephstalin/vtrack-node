const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const AddSchema = new mongoose.Schema({
    _id: Number,
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
},
{_id : false}
)
AddSchema.plugin(autoIncrement);

module.exports = mongoose.model('additional', AddSchema)
