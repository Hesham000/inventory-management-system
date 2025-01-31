const express = require('express');
const permissionController = require('../controllers/permissionController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, permissionController.createPermission);
router.get('/', authenticate, permissionController.getAllPermissions);
router.delete('/:id', authenticate, permissionController.deletePermission);

module.exports = router;
