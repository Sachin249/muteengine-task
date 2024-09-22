const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false,
        ref: 'users'
    },
    seller_id: {
        type: String,
        required: false,
        ref: 'users'
    },
    order_id:{
        type: String,
        required: true,
        ref: 'order'
    },
    payment_by: {
        type: String,
        required: true,
        default: 'Stripe'
    },
    transection_id: {
        type: String,
        required: false,
    },
    payment_type: {
        type: String,
        required: false,
        default: 'Online'
    },
    country: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: false,
    },
    payment_method: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false
    },
    last_digit: {
        type: String,
        required: false,

    },
    expiry_month: {
        type: String,
        required: false,

    },
    expiry_year: {
        type: String,
        required: false,

    },
    payment_recipt: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'Paid'
    },
});

paymentSchema.set('timestamps', true);
module.exports = mongoose.model('payment', paymentSchema,'payment');