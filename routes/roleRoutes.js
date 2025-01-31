const express = require('express');
const roleController = require('../controllers/roleController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/roles', roleController.createRole);
router.get('/', authenticate, roleController.getAllRoles);
router.delete('/:id', authenticate, roleController.deleteRole);

module.exports = router;
