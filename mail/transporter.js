// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
// });

// transporter.verify(function(error, success) {
//     if (error) {
//       console.log('Email connection error: ', error);
//     } else {
//       console.log('Email connection success');
//     }
//     transporter.close(); // Close the connection after verification is complete
// });

// module.exports = transporter;

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user:process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
});


transporter.verify(function(error, success) {
    if (error) {
      console.log('Email connection error: ', error);
    } else {
      console.log('Email connection success');
    }
    transporter.close(); // Close the connection after verification is complete
});

module.exports = transporter;