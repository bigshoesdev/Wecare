const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    name:{type:String},
    url:{type:String},
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
