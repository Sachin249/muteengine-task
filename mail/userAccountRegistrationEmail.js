const transporter = require('./transporter');

const userAccountRegistrationEmail = async ({ email, name, verificationLink }) => {
    const mainOptions = {
        from: "Eshop",
        to: email,
        subject: 'Registration Successful | Verify Your Eshop Account',
        html: `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body, p {
                    margin: 0;
                    padding: 0;
                }
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #003C83;
                    color: #fff;
                    padding: 15px 0;
                    text-align: center;
                }
                .content {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                }
                .headline {
                    font-size: 22px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .button {
                    text-align: center;
                    margin-top: 20px;
                }
                .button a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #003C83;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 14px;
                    color: #666;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Eshop!</h1>
            </div>
            <div class="content">
                <div class="headline">Account Registration Successful</div>
                <div class="message">
                    <p>Dear ${name},</p>
                    <p>We are excited to have you on board! Your account registration is now complete, but to access all features, we kindly ask you to verify your email address.</p>
                    <p>Please click the button below to verify your account and complete the setup process:</p>
                </div>
                <div class="button">
                    <a href="${verificationLink}">Verify My Account</a>
                </div>
                <div class="message" style="margin-top: 20px;">
                    <p>Thank you for choosing Eshop. If you have any questions, feel free to contact our support team.</p>
                </div>
            </div>
            <div class="footer">
                &copy; 2024 Eshop. All rights reserved.
            </div>
        </div>
        </body>
        </html>`
    };

    await transporter.sendMail(mainOptions);
};

module.exports = userAccountRegistrationEmail;
