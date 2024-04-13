const nodemailer = require("nodemailer");
const path = require("path");
const emailPass = process.env.emailPass;
const emailForMails = process.env.emailForMails;

const logoPath = path.join(__dirname, "../../assests/image/logo.png");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  secure: true,
  debug: true,
  auth: {
    user: emailForMails,
    pass: emailPass,
  },
});

const sendOTP = async (email, otp) => {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Ikenna Ibeneme" <ibenemeikenna96@gmail.com', // Sender address
      to: email, // List of recipients
      subject: "Your OTP for Verification", // Subject line
      text: `Your OTP for verification is: ${otp}`, // Plain text body
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .logo {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .logo img {
                  max-width: 150px;
              }
              .otp-text {
                  font-size: 24px;
                  font-weight: bold;
                  color: #333333;
                  text-align: center;
              }
              .otp-number {
                  font-size: 36px;
                  font-weight: bold;
                  color: #ffaa00;
                  margin-top: 10px;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                  <img src="cid:logo" alt="Company Logo">
              </div>
              <style>
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
            </style>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
            <div class="header">
              <h2 style='text-align: center; color: #000'>Welcome to Our Platform!</h2>
            </div>
            <div class="body">
              <p style='text-align: center; color: #000'>Dear User,</p>
              <p style='text-align: center; color: #000'>
                Thank you for choosing our platform. To ensure the security of your account, we have sent you a One-Time Passcode (OTP) for verification.
              </p>
              <p style='text-align: center; color: #000'>
                Please use the following OTP to complete the verification process:
              </p>
              <p class="otp-text">🔒 Your One-Time Passcode for Verification 🔑</p>
              <p>
                If you did not request this OTP or need assistance, please contact our support team immediately.
              </p>
              <p style="text-align: center; color: #000; font-family: 'Plus Jakarta Sans', sans-serif;">
                Thank you,
                <br>
                The Platform Team
              </p>
            </div>
              <p class="otp-number">${otp}</p>
          </div>
      </body>
      </html>

      `, // HTML body
      attachments: [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "logo", // Content ID of the image
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
    return error; // Rethrow the error for handling at a higher level
  }
};

module.exports = { sendOTP };
