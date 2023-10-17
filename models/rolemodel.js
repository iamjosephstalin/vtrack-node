const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter value for Role Name!"],
        unique: [true, "Role Name Already Exist"],
    },
    role: {
        required: [true, "Please select User Type!"],
        type: String
    }
})

module.exports = mongoose.model('Role', roleSchema)
