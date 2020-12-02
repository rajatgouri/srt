const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    business: {
        type: String,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    driverLicense: {
        type: String,
        trim: true
    },  
    address: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    step: {
        type: Number,
        trim: true
    },
    activated: {
        type: Boolean,
        trim: true
    },
    online: {
        type:Boolean,
        trim:true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("User", userSchema, 'users');
