const express = require('express');
const UserController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUserProfile);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/', authenticate, UserController.getAllUsers);
router.put('/:id/role', authenticate, UserController.changeUserRole);

module.exports = router; 