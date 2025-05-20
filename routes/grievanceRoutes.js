const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');

// Create, Read, Respond, Delete
router.post('/', grievanceController.createGrievance);
router.get('/', grievanceController.getAllGrievances);
router.get('/for/:recipient', grievanceController.getGrievancesFor); // ✅ New: fetch grievances for someone
router.put('/:id/respond', grievanceController.respondToGrievance);
router.delete('/:id', grievanceController.deleteGrievance);

module.exports = router;
