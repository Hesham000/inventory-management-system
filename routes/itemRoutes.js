const express = require('express');
const ItemController = require('../controllers/itemController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, ItemController.createItem);
router.get('/', authenticate, ItemController.getAllItems);
router.get('/:id', authenticate, ItemController.getItemById);
router.put('/:id', authenticate, ItemController.updateItem);
router.delete('/:id', authenticate, ItemController.deleteItem);
router.post('/analyze-image', authenticate, ItemController.analyzeItemImage);

module.exports = router; 