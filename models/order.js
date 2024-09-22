const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id:{
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    country: {
        type: String,
        required:true,
    },
    state: {
        type: String,
        required:true,
    },
    city: {
        type: String,
        required:true,
    },
    zipcode: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        enum:["Pending","Accepted","Shipped","Delivered"],
        default:"Pending"
    },
    payment_status:{
        type:String,
        enum:["Paid","UnPaid"],
        default:"UnPaid"
    },
    tax:{
        type:Number,
        default:0
    },
    total:{
        type:Number,
        default:0
    },
    is_order_processed:{
        type:Number,
        required:true,
        default:0
    },
    userId: {
        type: String,
        ref:"users",
        required:false,
    },
});

orderSchema.set('timestamps', true);
module.exports = mongoose.model('order',orderSchema,'order');