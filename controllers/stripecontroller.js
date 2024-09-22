var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifytokenuser');
const { body, validationResult } = require('express-validator');
const order = require('../models/order');
const payment = require('../models/payment');
let stripeKey = process.env.STRIPE_PUBLISH_KEY
let stripeSecret = process.env.STRIPE_SECRET_KEY
const PDFDocument = require('pdfkit');
const fs = require('fs');
const sendOrderInvoiceEmail = require('../mail/sendOrderInvoiceEmail');

// Function to generate the PDF order invoice
// const generateOrderInvoice = (order, filename, callback) => {
//   const doc = new PDFDocument();
//   const filePath = `./${filename}.pdf`;
//   const stream = fs.createWriteStream(filePath);
//   doc.pipe(stream);

//   // Add header and order details
//   doc.fontSize(20).text('Order Invoice', { align: 'center' }).moveDown();
  
//   doc.fontSize(12)
//      .text(`Order ID: ${order.id}`)
//      .text(`Order Date: ${order.date}`)
//      .text(`Customer Name: ${order.customerName}`)
//      .moveDown();

//   // Add product details
//   doc.fontSize(14).text('Products:');
//   order.products.forEach(product => {
//       doc.fontSize(12).text(`- ${product.name}: ${product.quantity} x $${product.price}`);
//   });
//   doc.moveDown();

//   // Add totals
//   doc.text(`Subtotal: $${order.subtotal}`)
//      .text(`Tax: $${order.tax}`)
//      .text(`Total Amount: $${order.total}`)
//      .text(`Payment Status: ${order.paymentStatus}`)
//      .moveDown();

//   doc.end();

//   stream.on('finish', () => {
//       callback(filePath); // Call callback when the PDF is fully generated
//   });
// };

// Helper function to draw a table row
// const tableRow = (doc, y, item, quantity, price, total) => {
//   doc.fontSize(10)
//     .text(item, 50, y)
//     .text(quantity, 250, y, { width: 90, align: 'right' })
//     .text(`$${price.toFixed(2)}`, 340, y, { width: 90, align: 'right' })
//     .text(`$${total.toFixed(2)}`, 430, y, { width: 90, align: 'right' });
// };

// // Helper function to draw table header
// const tableHeader = (doc, y) => {
//   doc.fontSize(10).fillColor('#003C83')
//     .text('Item', 50, y)
//     .text('Quantity', 250, y, { width: 90, align: 'right' })
//     .text('Unit Price', 340, y, { width: 90, align: 'right' })
//     .text('Total', 430, y, { width: 90, align: 'right' });
// };

// const generateOrderInvoice = (order, filename, callback) => {
//   const doc = new PDFDocument({ margin: 50 });
//   const filePath = `./${filename}.pdf`;
//   const stream = fs.createWriteStream(filePath);
//   doc.pipe(stream);

//   // Header section
//   doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
  
//   doc.fontSize(12)
//     .text(`Order ID: ${order.id}`)
//     .text(`Order Date: ${order.date}`)
//     .text(`Customer Name: ${order.customerName}`)
//     .moveDown();

//   // Draw line under header
//   doc.moveTo(50, 150).lineTo(550, 150).stroke();

//   // Products table header
//   tableHeader(doc, 160);

//   // Products list (draw each product in the table)
//   let currentY = 180;
//   order.products.forEach(product => {
//     const productTotal = product.quantity * product.price;
//     tableRow(doc, currentY, product.name, product.quantity, product.price, productTotal);
//     currentY += 20;
//   });

//   // Add totals at the bottom
//   const subTotalY = currentY + 30;
//   doc.moveTo(50, subTotalY - 10).lineTo(550, subTotalY - 10).stroke(); // Line above totals
//   doc.fontSize(12)
//     .text('Subtotal:', 400, subTotalY, { align: 'right' })
//     .text(`$${order.subtotal.toFixed(2)}`, 460, subTotalY, { align: 'right' });

//   const taxY = subTotalY + 20;
//   doc.text('Tax:', 400, taxY, { align: 'right' })
//     .text(`$${order.tax.toFixed(2)}`, 460, taxY, { align: 'right' });

//   const totalY = taxY + 20;
//   doc.fontSize(14).text('Total:', 400, totalY, { align: 'right' })
//     .text(`$${order.total.toFixed(2)}`, 460, totalY, { align: 'right' });

//   const paymentStatusY = totalY + 30;
//   doc.fontSize(12).text(`Payment Status: ${order.paymentStatus}`, { align: 'left' }).moveDown();

//   // Footer section (optional)
//   doc.fontSize(10).text('Thank you for your order!', { align: 'center', baseline: 'bottom' });

//   doc.end();

//   stream.on('finish', () => {
//     callback(filePath); // Call callback when the PDF is fully generated
//   });
// };

// const tableRow = (doc, y, item, quantity, price, total) => {
//   doc.fontSize(10)
//     .text(item, 50, y)
//     .text(quantity, 250, y, { width: 90, align: 'right' })
//     .text(`$${price.toFixed(2)}`, 340, y, { width: 90, align: 'right' })
//     .text(`$${total.toFixed(2)}`, 430, y, { width: 90, align: 'right' });
// };

// // Helper function to draw table header
// const tableHeader = (doc, y) => {
//   doc.fontSize(10).fillColor('#003C83')
//     .text('Item', 50, y)
//     .text('Quantity', 250, y, { width: 90, align: 'right' })
//     .text('Unit Price', 340, y, { width: 90, align: 'right' })
//     .text('Total', 430, y, { width: 90, align: 'right' });
// };

// const generateOrderInvoice = (order, filename, callback) => {
//   const doc = new PDFDocument({ margin: 50 });
//   const filePath = `./${filename}.pdf`;
//   const stream = fs.createWriteStream(filePath);
//   doc.pipe(stream);

//   // Header section
//   doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
  
//   doc.fontSize(12)
//     .text(`Order ID: ${order.id}`)
//     .text(`Order Date: ${order.date}`)
//     .text(`Customer Name: ${order.customerName}`)
//     .moveDown();

//   // Draw line under header
//   doc.moveTo(50, 150).lineTo(550, 150).stroke();

//   // Products table header
//   tableHeader(doc, 160);

//   // Products list (draw each product in the table)
//   let currentY = 180;
//   order.products.forEach(product => {
//     const productTotal = product.quantity * product.price;
//     tableRow(doc, currentY, product.name, product.quantity, product.price, productTotal);
//     currentY += 20; // Move down for the next product row
//   });

//   // Add totals at the bottom with proper spacing
//   const subTotalY = currentY + 40; // Adjusted spacing
//   doc.moveTo(50, subTotalY - 10).lineTo(550, subTotalY - 10).stroke(); // Line above totals
//   doc.fontSize(12)
//     .text('Subtotal:', 400, subTotalY, { align: 'right' })
//     .text(`$${order.subtotal.toFixed(2)}`, 460, subTotalY, { align: 'right' });

//   const taxY = subTotalY + 20;
//   doc.text('Tax:', 400, taxY, { align: 'right' })
//     .text(`$${order.tax.toFixed(2)}`, 460, taxY, { align: 'right' });

//   const totalY = taxY + 20;
//   doc.fontSize(14).text('Total:', 400, totalY, { align: 'right' })
//     .text(`$${order.total.toFixed(2)}`, 460, totalY, { align: 'right' });

//   const paymentStatusY = totalY + 30; // Ensuring sufficient spacing
//   doc.fontSize(12).text(`Payment Status: ${order.paymentStatus}`, 50, paymentStatusY).moveDown();

//   // Footer section (optional)
//   doc.fontSize(10).text('Thank you for your order!', { align: 'center', baseline: 'bottom' });

//   doc.end();

//   stream.on('finish', () => {
//     callback(filePath); // Call callback when the PDF is fully generated
//   });
// };


// Helper function to draw a table row
const tableRow = (doc, y, item, quantity, price, total) => {
  doc.fontSize(10)
    .text(item, 50, y)
    .text(quantity, 250, y, { width: 90, align: 'right' })
    .text(`$${price.toFixed(2)}`, 340, y, { width: 90, align: 'right' })
    .text(`$${total.toFixed(2)}`, 430, y, { width: 90, align: 'right' });
};

// Helper function to draw table header
const tableHeader = (doc, y) => {
  doc.fontSize(10).fillColor('#003C83')
    .text('Item', 50, y)
    .text('Quantity', 250, y, { width: 90, align: 'right' })
    .text('Unit Price', 340, y, { width: 90, align: 'right' })
    .text('Total', 430, y, { width: 90, align: 'right' });
};

const generateOrderInvoice = (order, filename, callback) => {
  const doc = new PDFDocument({ margin: 50 });
  const filePath = `./${filename}.pdf`;
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Header section
  doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
  
  doc.fontSize(12)
    .text(`Order ID: ${order.id}`)
    .text(`Order Date: ${order.date}`)
    .text(`Customer Name: ${order.customerName}`)
    .moveDown();

  // Draw line under header
  doc.moveTo(50, 150).lineTo(550, 150).stroke();

  // Products table header
  tableHeader(doc, 160);

  // Products list (draw each product in the table)
  let currentY = 180;
  order.products.forEach(product => {
    const productTotal = product.quantity * product.price;
    tableRow(doc, currentY, product.name, product.quantity, product.price, productTotal);
    currentY += 20; // Move down for the next product row
  });

  // Add totals at the bottom with proper spacing
  const subTotalY = currentY + 40; // Adjusted spacing
  doc.moveTo(50, subTotalY - 10).lineTo(550, subTotalY - 10).stroke(); // Line above totals
  
  // Subtotal
  doc.fontSize(12)
    .text('Subtotal:', 350, subTotalY, { align: 'left' })  // Adjust label position
    .text(`$${order.subtotal.toFixed(2)}`, 480, subTotalY, { align: 'right' }); // Adjust value position

  // Tax
  const taxY = subTotalY + 20;
  doc.text('Tax:', 350, taxY, { align: 'left' })  // Adjust label position
    .text(`$${order.tax.toFixed(2)}`, 480, taxY, { align: 'right' }); // Adjust value position

  // Total
  const totalY = taxY + 20;
  doc.fontSize(14)
    .text('Total:', 350, totalY, { align: 'left' })  // Adjust label position
    .text(`$${order.total.toFixed(2)}`, 480, totalY, { align: 'right' }); // Adjust value position

  // Payment Status
  const paymentStatusY = totalY + 30; // Ensuring sufficient spacing
  doc.fontSize(12).text(`Payment Status: ${order.paymentStatus}`, 50, paymentStatusY).moveDown();

  // Footer section (optional)
  doc.fontSize(10).text('Thank you for your order!', { align: 'center', baseline: 'bottom' });

  doc.end();

  stream.on('finish', () => {
    callback(filePath); // Call callback when the PDF is fully generated
  });
};

router.get("/get-stripe-details", verifyToken,async (req, res) => {
  try {
      return res.status(200).json({
        status:true, 
        message:"Data found",
        data:{stripeKey,stripeSecret} 
    });
   
  } catch (err) {
    console.log(err);
    return res.status(500).json({status:false, message: err.message })
  }
});


router.post("/create-payment-intent",verifyToken, async (req, res) => {
  try {
 
  const stripe = require('stripe')(stripeSecret);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: req.body.amount,
      description: 'Ecommerce app transaction',
      automatic_payment_methods: { enabled: true },
    });
    console.log("paymentintent",paymentIntent)
    return res.status(200).json({status:true, success:"Data found",data:paymentIntent });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post("/generate-payment",verifyToken, async (req, res) => {
  try {
   const getOrder =  await order.findById(req.body.orderId)
   if(!getOrder){
      return res.status(400).json({
        status:false,
        message:"No order found!"
      })
   }

  const stripe = require('stripe')(stripeSecret);
    const paymentIntentDetail = await stripe.paymentIntents.retrieve(req.body.paymentIntentId)
    console.log("paymentIntentDetail",paymentIntentDetail)

      const getCharge = await stripe.charges.retrieve(
        paymentIntentDetail.latest_charge
      );
 
    let data = {
      user_id:req.decoded.id,
      seller_id:"",
      order_id:req.body.orderId,
      transection_id:getCharge?.balance_transaction,
      payment_type:getCharge?.payment_method_details?.type,
      country:getCharge?.payment_method_details?.card?.country,
      currency:getCharge.currency,
      amount:getCharge.amount,
      brand:getCharge?.payment_method_details?.card?.brand,
      last_digit:getCharge?.payment_method_details?.card?.last4,
      expiry_month:getCharge?.payment_method_details?.card?.exp_month,
      expiry_year:getCharge?.payment_method_details?.card?.exp_year,
      payment_recipt:getCharge?.receipt_url,
      status:getCharge.status
    }

    const paymentData = new payment(data)
    await paymentData.save()
   const orderUpdate =  await order.findByIdAndUpdate(req.body.orderId,{
    is_order_processed:1,
    payment_status:"Paid"
   })

    return res.status(200).json({status:true, message:"Payment Successfull , Thanks for ordering!",data:data });
  } catch (err) {
    return res.status(500).send({status:false,message:err.message});
  }
});



router.get("/test",async (req,res)=>{
  try{
    let orderData = {
      "id": "12345",
      "date": "2024-09-22",
      "customerName": "John Doe",
      "products": [
        { "name": "Product A", "quantity": 2, "price": 20 },
        { "name": "Product B", "quantity": 1, "price": 50 }
      ],
      "subtotal": 90,
      "tax": 5,
      "total": 95,
      "paymentStatus": "Paid",
      "email": "sachinsen249@gmail.com"
    }
    
    const filename = `order_${orderData.id}`;
    generateOrderInvoice(orderData, filename, (pdfPath) => {
      // Send the PDF as an email attachment
      sendOrderInvoiceEmail(orderData.email, filename, (err, info) => {
          if (err) {
              return res.status(500).send('Error sending invoice email: ' + err.message);
          }
          res.status(200).send('Invoice email sent successfully: ' + info.response);
      });
    });
    res.send("ok")
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;