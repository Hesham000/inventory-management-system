const Employee = require('../models/employee');

class EmployeeController {
    // Create a new employee
    static async createEmployee(req, res, next) {
        try {
            const { FirstName, LastName, Position, Email, Phone } = req.body;
            if (!FirstName || !LastName || !Email) {
                return res.status(400).json({ message: 'FirstName, LastName, and Email are required' });
            }

            const employee = await Employee.create({ FirstName, LastName, Position, Email, Phone });
            res.status(201).json({ message: 'Employee created successfully', employee });
        } catch (error) {
            next(error);
        }
    }

    // Get all employees
    static async getAllEmployees(req, res, next) {
        try {
            const employees = await Employee.findAll();
            res.json(employees);
        } catch (error) {
            next(error);
        }
    }

    // Get an employee by ID
    static async getEmployeeById(req, res, next) {
        try {
            const { id } = req.params;
            const employee = await Employee.findByPk(id);

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            res.json(employee);
        } catch (error) {
            next(error);
        }
    }

    // Update an employee
    static async updateEmployee(req, res, next) {
        try {
            const { id } = req.params;
            const { FirstName, LastName, Position, Email, Phone } = req.body;

            const employee = await Employee.findByPk(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            employee.FirstName = FirstName || employee.FirstName;
            employee.LastName = LastName || employee.LastName;
            employee.Position = Position || employee.Position;
            employee.Email = Email || employee.Email;
            employee.Phone = Phone || employee.Phone;
            await employee.save();

            res.json({ message: 'Employee updated successfully', employee });
        } catch (error) {
            next(error);
        }
    }

    // Delete an employee
    static async deleteEmployee(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Employee.destroy({ where: { EmployeeID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            res.json({ message: 'Employee deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EmployeeController; 