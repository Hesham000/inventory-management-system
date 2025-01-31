const express = require('express');
const NLUController = require('../controllers/nluController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/analyze', authenticate, NLUController.analyzeText);

module.exports = router; 