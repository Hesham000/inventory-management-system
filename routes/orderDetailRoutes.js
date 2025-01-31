const express = require('express');
const OrderDetailController = require('../controllers/orderDetailController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, OrderDetailController.createOrderDetail);
router.get('/', authenticate, OrderDetailController.getAllOrderDetails);
router.get('/:id', authenticate, OrderDetailController.getOrderDetailById);
router.put('/:id', authenticate, OrderDetailController.updateOrderDetail);
router.delete('/:id', authenticate, OrderDetailController.deleteOrderDetail);

module.exports = router; 