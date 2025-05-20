const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');

// Existing routes
router.post('/', grievanceController.createGrievance);
router.get('/', grievanceController.getAllGrievances);
router.put('/:id/respond', grievanceController.respondToGrievance);

// ✅ Add this route for deleting
router.delete('/:id', grievanceController.deleteGrievance);

module.exports = router;


Database.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


