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




