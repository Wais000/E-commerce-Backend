const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MY_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Joker 👻" <joker@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html, // html body (assuming 'data.html' is the correct property)
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    return info; // Returning 'info' if you need to handle the response elsewhere
  } catch (error) {
    console.error("Error sending email:", error); // Log the detailed error message
    throw new Error("Error sending email"); // Rethrowing the error to handle it elsewhere
  }
});

module.exports = sendEmail;