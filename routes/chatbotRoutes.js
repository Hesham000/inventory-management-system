const express = require('express');
const ChatbotController = require('../controllers/chatbotController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/message', authenticate, ChatbotController.sendMessage);

module.exports = router; 