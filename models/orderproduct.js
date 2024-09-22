const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id:{
        type: String,
        ref:"order",
        required: false,
    },
    product_id:{
        type: String,
        ref:"product",
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required:false,
    },
    price: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:false,
    },
    quantity: {
        type: String,
        required:true,
    },
    userId: {
        type: String,
        ref:"users",
        required:false,
    },
});

orderSchema.set('timestamps', true);
module.exports = mongoose.model('orderproduct',orderSchema,'orderproduct');