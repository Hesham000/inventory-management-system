const express = require('express');
const EmployeeController = require('../controllers/employeeController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, EmployeeController.createEmployee);
router.get('/', authenticate, EmployeeController.getAllEmployees);
router.get('/:id', authenticate, EmployeeController.getEmployeeById);
router.put('/:id', authenticate, EmployeeController.updateEmployee);
router.delete('/:id', authenticate, EmployeeController.deleteEmployee);

module.exports = router; 