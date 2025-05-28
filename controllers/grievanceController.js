const Grievance = require('../models/Grievance');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailNotification = async (sender, recipientEmail, grievanceText) => {
  const mailOptions = {
    from: `"Grievance Portal 💌" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `📩 New grievance from ${sender}`,
    html: `<p>There is a grievance for you😋</p><p>💬 "${grievanceText}"</p><p>Visit the portal to view and respond. 💖</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${recipientEmail}`);
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
  }
};

// Create grievance with email notification
exports.createGrievance = async (req, res) => {
  try {
    const grievance = new Grievance(req.body);
    await grievance.save();

    const { sender, recipient, text } = req.body;
    const recipientEmail = recipient === 'Mimansa' ? process.env.MIMANSA_EMAIL : process.env.RAMAN_EMAIL;

    await sendEmailNotification(sender, recipientEmail, text);

    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Other functions remain unchanged)
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGrievancesFor = async (req, res) => {
  try {
    const { recipient } = req.params;
    const grievances = await Grievance.find({ recipient });
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondToGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const grievance = await Grievance.findByIdAndUpdate(id, { response }, { new: true });
    res.status(200).json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    await Grievance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Grievance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grievance', error });
  }
};



