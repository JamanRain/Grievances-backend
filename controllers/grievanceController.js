const Grievance = require('../models/Grievance');

// Create grievance
exports.createGrievance = async (req, res) => {
  try {
    const grievance = new Grievance(req.body);
    await grievance.save();
    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all grievances
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Respond to grievance
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

// ✅ Delete grievance (moved outside)
exports.deleteGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    await Grievance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Grievance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grievance', error });
  }
};

