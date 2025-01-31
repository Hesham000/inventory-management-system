const User = require('../models/user');
const { validationResult } = require('express-validator');

class UserController {
    // Fetches the details of a specific user by ID
    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: { exclude: ['Password', 'VerificationToken', 'ResetToken'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    // Updates the profile of a specific user
    static async updateUserProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { firstName, lastName, email } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user details
            user.FirstName = firstName || user.FirstName;
            user.LastName = lastName || user.LastName;
            user.Email = email || user.Email;

            await user.save();

            res.json({ message: 'User profile updated successfully', user });
        } catch (error) {
            next(error);
        }
    }

    // Deletes a user by ID
    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({ where: { UserID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Fetches a list of all users
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['Password', 'VerificationToken', 'ResetToken'] }
            });
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // Changes the role of a specific user
    static async changeUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.Role = role;
            await user.save();

            res.json({ message: 'User role updated successfully', user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController; 