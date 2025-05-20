const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  username: String, // Who submitted the grievance
  recipient: String, // New: Who it's meant for
  title: String,
  details: String,
  severity: Number,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
