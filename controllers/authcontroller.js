var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
var users = require('../models/user')
var verifyToken = require('../middleware/verifytokenuser');
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const config = require("../config/jwtconfig")
const userAccountRegistrationEmail = require('../mail/userAccountRegistrationEmail');
const userPasswordResetMail = require('../mail/userPasswordResetMail');


router.post('/user-login', 
body('email').not().isEmpty().withMessage('email Required'), 
body('password').not().isEmpty().withMessage('password Required'), 
async function(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({status:false,message:"All fields are required", errors: errors.array() });
  }

  try{
    let email = req.body.email.toLowerCase()
    console.log(email)
    const user = await users.findOne({email:email})
    if(!user){
      return res.status(400).json({
        status:false,
        message:"No account found with this email address."
      });
    }
    console.log(user)
    const match = await bcrypt.compare(req.body.password, user.password);

    if(match){
      if(user.email_verified==0){
        return res.status(400).json({
          status:false,
          message:"Email not verified!"
        })
      }

        let token = jwt.sign({ id: user._id,name: user.name}, config.usersecretKey, {
                            algorithm: config.algorithm,
                            expiresIn: '7d'
                      });
      const updateData= await users.findOneAndUpdate({'_id':user._id}, {'remember_token':token,});
      return res.status(200).json({
        status:true,
        message: "Login Successfully",
        jwttoken: token,
        data:user
      });
    }
    else{
      return res.status(400).json({
        status:false,
        message:"Login failed , invalid password."
      });
    }

  }
  catch(err){
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong , please try again later'
    });
  }
  
});


router.post('/user-signup', 
  body('name').not().isEmpty().withMessage('Name Required'), 
  body('email').not().isEmpty().withMessage('Email Required'), 
  body('password').not().isEmpty().withMessage('Password Required'), 
  async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:false,message:"All fields are required", errors: errors.array() });
    }

    try {
      // Check if the email already exists
      if(req.body.email.toLowerCase()){
           const existingUser = await users.findOne({ email: req.body.email.toLowerCase()});
              if (existingUser) {
                return res.status(400).json({ status : false , message: 'Email already exists' });
              }
      }
     
      
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      const emailVerificationToken = crypto.randomBytes(32).toString('hex');

      const add = new users({
        "name": req.body.name,
        "email": req.body.email.toLowerCase(),
        "password": hash,
        "email_verification_token": emailVerificationToken,
      });
      const user  = await add.save();

        userAccountRegistrationEmail({
          email:user.email,
          name:user.name,
          verificationLink:process.env.APP_USER_EMAIL_VERIFICATION_PAGE+emailVerificationToken
        })
        
      return res.status(200).json({status : true, message: 'Registration Successful! We have sent a verification email to your registered email address.'});
    } catch (err) {
      console.log(err)
      return res.status(500).json({ status : false, errors: err });
    }
});


router.post("/user-email-verification",
  body('token').not().isEmpty().withMessage('token Required'), async (req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(500).json({ errors: errors.array() });
       }
    
    try{
      console.log(req.body.token)
      
      let emailUser = await users.findOne({"email_verification_token":req.body.token})
     
      if(!emailUser){
        return res.status(400).json({
          status:false,
          message:"Something went wrong, please try again later."
        })
      }
      if(emailUser.email_verified===1){
        return res.status(200).json({
          status:true,
          message:"Account already verfied."
        })
      }
  
      await users.findByIdAndUpdate(emailUser._id,{
        // 'email_verification_token':null,
        'email_verified':1
      })
    
      return res.status(200).json({
        status:true,
        message:"Account Verified Successfully",
      })
    }
    catch(err){
      return res.status(500).json({
        status:false,
        message: err.message
      });
    }
    
});

router.post("/send-user-password-reset-mail",
  body('email').not().isEmpty().withMessage('email Required'), async (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({status:false,message:"All fields are required!", errors: errors.array() });
     }
  
  try{
    
    let user = await users.findOne({"email":req.body.email})
   
    if(!user){
      return res.status(400).json({
        status:false,
        message:"No account found with this email."
      })
    }
  
    let token = jwt.sign({ id: user._id,name: user.name}, config.usersecretKey, {
      expiresIn: '1h'
    });
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    // user.resetTokenExpiry = Date.now() + (3600000 * 7); // 48 hours
    await user.save();

    userPasswordResetMail({
      email:user.email,
      name:user.name,
      resetLink:process.env.APP_USER_PASSWORD_RESET_PAGE+token
   })
  
    return res.status(200).json({
      status:true,
      message:"Verification email sent to your registered email account , please check.",
    })
  }
  catch(err){
    return res.status(500).json({
      status:false,
      message: err.message
    });
  }
});


router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, config.usersecretKey);
    console.log("token",token)
    console.log(decoded.id)

    const user = await users.findOne({ _id: decoded.id, resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    console.log(user)
    if (!user){
      return res.status(400).json({status:false, message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({status:true, message: 'Password reset successful' });
  } catch (error) {
    return res.status(400).json({status:false, message: 'Invalid token' });
  }
});

router.post('/user-login-with-google', 
  body('email').not().isEmpty().withMessage('email Required'), 
  async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:false,message:"All fields are required", errors: errors.array() });
    }
  
    try{
      let email = req.body.email.toLowerCase()
      const user = await users.findOne({email:email})
      if(!user){
        return res.status(400).json({
          status:false,
          message:"No account found with this email address."
        });
      }

      if(user.email_verified==0){
        return res.status(400).json({
          status:false,
          message:"Email not verified!"
        })
      }

      let token = jwt.sign({ id: user._id,name: user.name}, config.usersecretKey, {
        algorithm: config.algorithm,
        expiresIn: '7d'
      });
      const updateData= await users.findOneAndUpdate({'_id':user._id}, {'remember_token':token,});
      return res.status(200).json({
        status:true,
        message: "Login Successfully",
        jwttoken: token,
        data:user
      });
  
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        message: 'Something went wrong , please try again later'
      });
    }
    
});

router.post('/user-signup-with-google', 
  body('email').not().isEmpty().withMessage('Email Required'), 
  async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({status:false,message:"All fields are required", errors: errors.array() });
    }

    try {
      // Check if the email already exists
      if(req.body.email.toLowerCase()){
           const existingUser = await users.findOne({ email: req.body.email.toLowerCase()});
              if (existingUser) {
                return res.status(400).json({ status : false , message: 'Email already exists' });
              }
      }
     
      const add = new users({
        "name": req.body.name,
        "email": req.body.email.toLowerCase(),
        "signup_by":"Google",
        "email_verified":1
      });
      const user  = await add.save()
      let token = jwt.sign({ id: user._id,name: user.name}, config.usersecretKey, {
        algorithm: config.algorithm,
        expiresIn: '7d'
      });
      const updateData= await users.findOneAndUpdate({'_id':user._id}, {'remember_token':token,});
      return res.status(200).json({
        status:true,
        message: "Registration Successful!",
        jwttoken: token,
        data:user
      });
        
    } catch (err) {
      console.log(err)
      return res.status(500).json({ status : false, errors: err });
    }
});

router.get("/get-profile",verifyToken, async (req, res, next) => {
  try{
    let user = await users.findById(req.decoded.id)
   
    if(!user){
      return res.status(400).json({
        status:false,
        message:"User not found!"
      })
    }

    return res.status(200).json({
      status:true,
      message:"Data Found",
      data:user
    })
  }
  catch(err){
    return res.status(500).json({
      status:false,
      message: err.message
    });
  }
  
});

module.exports = router;