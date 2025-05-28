// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your email
    pass: process.env.EMAIL_PASS        // your app password
  }
});

const sendGrievanceEmail = async (fromUser, toUserEmail, grievanceText) => {
  const mailOptions = {
    from: `"Grievance Portal" <${process.env.EMAIL_USER}>`,
    to: toUserEmail,
    subject: `New grievance from ${fromUser}`,
    text: `You have received a new grievance from ${fromUser}:\n\n"${grievanceText}"`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to:", toUserEmail);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

module.exports = sendGrievanceEmail;
