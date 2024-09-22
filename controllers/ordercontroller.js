var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifytokenuser');
const { body, validationResult } = require('express-validator');
const order = require("../models/order")
const orderproduct = require("../models/orderproduct")
const product = require("../models/product")

router.post("/create-order",verifyToken,
body('name').not().isEmpty().withMessage('name Required'), 
body('email').not().isEmpty().withMessage('email Required'), 
body('phone').not().isEmpty().withMessage('phone Required'), 
body('address').not().isEmpty().withMessage('address Required'), 
body('country').not().isEmpty().withMessage('country Required'), 
body('state').not().isEmpty().withMessage('state Required'), 
body('city').not().isEmpty().withMessage('city Required'), 
body('zipcode').not().isEmpty().withMessage('zipcode Required'), 
body('products').not().isEmpty().withMessage('products Required'), 
     async (req, res) => {
  try {
    let data = {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      address:req.body.address,
      country:req.body.country,
      state:req.body.state,
      city:req.body.city,
      zipcode:req.body.zipcode,
      payment_status:req.body.payment_status,
      userId:req.decoded.id
    }
    
    if (!Array.isArray(req.body.products)) {
      return res.status(400).json({status:false, message: "product_ids must be an array" });
    }

    const orderPrefix = "ESHOP" 
    const orderCount = await order.countDocuments()
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().slice(-2); // YY
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // MM
    const currentDay = String(currentDate.getDate()).padStart(2, '0'); // DD
    const dateStr = `${currentYear}${currentMonth}${currentDay}`;
    const uniqueNumber = String(orderCount + 1).padStart(6, '0');
    let order_id = `${orderPrefix}-${dateStr}-${uniqueNumber}`
    console.log(order_id)
    data.order_id = order_id
    const orderData = new order(data)
    const saveOrder = await orderData.save()
    let total = 0
    for (const item of req.body.products) {
      total =total + item.price * item.quantity
      const checkProduct = await product.findById(item._id)
      if(checkProduct){
        const orderProductData = new orderproduct({
          order_id:saveOrder._id,
          product_id:item._id,
          name:item.title,
          price:item.price,
          quantity:item.quantity,
          description:item.description,
          img:item.img,
          userId:req.decoded.id
        })
        await orderProductData.save()
      }
      
    }

    await order.findByIdAndUpdate(saveOrder._id,{total:total,tax:total*0.1})

    return res.status(200).json({status:true, message:"Ordered Confirmed!",data:saveOrder });
  } catch (err) {
    return res.status(500).send({status:false,message:err.message});
  }
});



module.exports = router;