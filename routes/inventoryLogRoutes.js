const express = require('express');
const InventoryLogController = require('../controllers/inventoryLogController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, InventoryLogController.createInventoryLog);
router.get('/', authenticate, InventoryLogController.getAllInventoryLogs);
router.get('/:id', authenticate, InventoryLogController.getInventoryLogById);
router.put('/:id', authenticate, InventoryLogController.updateInventoryLog);
router.delete('/:id', authenticate, InventoryLogController.deleteInventoryLog);

module.exports = router; 