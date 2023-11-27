const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a Name!"],
        unique: [true, "Client Name Already Exist"],
    },
    active: {
        type: Boolean,
        default: true
    },
    address: {
        type: String
    },
    tax: {
        type: String
    },
    city: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    phone: {
        type: String
    },
    postal: {
        type: Number
    },
    web: {
        type: String
    },
    comments: {
        type: String
    }
})

module.exports = mongoose.model('Client', clientSchema)
