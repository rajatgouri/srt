const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: Number,
        required: true,
        trim: true
    },
    year:{
        type: Number,
        required: true,
        trim: true
    },
    cvc: {
        type: Number,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Card", cardSchema, 'cards');
