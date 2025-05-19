// controllers/messageController.js
const Message = require('../models/Message');

// Send a new message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: 'senderId, receiverId, and content are required.' });
  }

  try {
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to send message',
      details: error.message
    });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'user1 and user2 query parameters are required.' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch messages',
      details: error.message
    });
  }
};

