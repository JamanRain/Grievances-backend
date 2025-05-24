const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,         // "Mimansa" or "Raman"
  password: String      // shared password
});

module.exports = mongoose.model('User', userSchema);
