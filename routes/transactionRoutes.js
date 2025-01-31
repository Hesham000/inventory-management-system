const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, TransactionController.createTransaction);
router.get('/', authenticate, TransactionController.getAllTransactions);
router.get('/:id', authenticate, TransactionController.getTransactionById);
router.put('/:id', authenticate, TransactionController.updateTransaction);
router.delete('/:id', authenticate, TransactionController.deleteTransaction);

module.exports = router; 