const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const Message = require('../models/messageModel');

// POST: Send a new message
router.post('/send', messageController.sendMessage);

// ✅ New route to match frontend: /api/messages?sender=...&receiver=...
router.get('/', async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Existing route (optional if unused)
router.get('/history', messageController.getMessages);

module.exports = router;

