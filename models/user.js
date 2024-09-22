const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:false,
    },
    email_verified:{
        type:Number,
        default:0
    },
    email_verification_token: {
        type: String,
        default:null,
        required: false
    },
    remember_token: {
        type: String,
        required: false
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    status: {
        type: String,
        required: true,
        default: 'Active'
    },
    signup_by:{
        type:String,
        default:"App"
    }
});

UserSchema.set('timestamps', true);
module.exports = mongoose.model('users',UserSchema,'users');