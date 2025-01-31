const express = require('express');
const OrderController = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, OrderController.createOrder);
router.get('/', authenticate, OrderController.getAllOrders);
router.get('/:id', authenticate, OrderController.getOrderById);
router.put('/:id', authenticate, OrderController.updateOrder);
router.delete('/:id', authenticate, OrderController.deleteOrder);
router.post('/analyze-feedback', authenticate, OrderController.analyzeFeedback);

module.exports = router; 