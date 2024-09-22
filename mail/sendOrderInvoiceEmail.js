// sendOrderInvoiceEmail.js
const transporter = require('./transporter');

const sendOrderInvoiceEmail = async (email, filename, callback) => {
    const mailOptions = {
        from: 'Eshop <your-email@gmail.com>',
        to: email,
        subject: 'Your Order Invoice',
        text: 'Please find your order invoice attached.',
        attachments: [
            {
                filename: `${filename}.pdf`,
                path: `./${filename}.pdf`,
                contentType: 'application/pdf',
            },
        ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            callback(err);
        } else {
            // Delete the file after sending the email
            fs.unlink(`./${filename}.pdf`, (unlinkErr) => {
                if (unlinkErr) throw unlinkErr;
                callback(null, info);
            });
        }
    });
};

module.exports = sendOrderInvoiceEmail;
