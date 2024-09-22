const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:false,
    },
    price: {
        type: Number,
        required:true,
    },
    quantity: {
        type: String,
        required:false,
    },
    img: {
        type: String,
        required:false,
    },
    userId: {
        type: String,
        ref:"users",
        required:false,
    },
});

productSchema.set('timestamps', true);
module.exports = mongoose.model('product',productSchema,'product');