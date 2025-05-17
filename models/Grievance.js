const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  username: String, // either "Mimansa" or "Raman169"
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
