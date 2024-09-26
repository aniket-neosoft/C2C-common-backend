const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
    _id: Number,
    shoeName: String,
    brandName: String,
    category: String,
    description: String,
    price: Number,
    discount: Number,
    size: String,
    color: String,
    image: {
        contentType: String,
        data: Buffer
    },
    gender: String
});

const shoeModel = mongoose.model("Shoe", shoeSchema);

module.exports = shoeModel;