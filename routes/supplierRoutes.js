const express = require('express');
const SupplierController = require('../controllers/supplierController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, SupplierController.createSupplier);
router.get('/', authenticate, SupplierController.getAllSuppliers);
router.get('/:id', authenticate, SupplierController.getSupplierById);
router.put('/:id', authenticate, SupplierController.updateSupplier);
router.delete('/:id', authenticate, SupplierController.deleteSupplier);

module.exports = router; 