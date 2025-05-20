const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');

// Create, Read, Respond, Delete
router.post('/', grievanceController.createGrievance);
router.get('/', grievanceController.getAllGrievances);
router.get('/for/:recipient', grievanceController.getGrievancesFor);
router.put('/:id/respond', grievanceController.respondToGrievance); // ✅ Correct route for response
router.delete('/:id', grievanceController.deleteGrievance);

// Optional: allow PUT to both /:id and /:id/respond
// router.put('/:id', grievanceController.respondToGrievance);

module.exports = router;

