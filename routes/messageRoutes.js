const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST: Send a new message
// Body should contain: senderId, receiverId, content
router.post('/send', messageController.sendMessage);

// GET: Fetch messages between two users
// Query parameters: ?user1=<id>&user2=<id>
router.get('/history', messageController.getMessages);

module.exports = router;
