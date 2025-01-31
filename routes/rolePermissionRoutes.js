const express = require('express');
const rolePermissionController = require('../controllers/rolePermissionController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/assign', authenticate, rolePermissionController.assignPermission);
router.get('/', authenticate, rolePermissionController.getAllRolePermissions);

module.exports = router;
