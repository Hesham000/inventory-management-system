const { body } = require('express-validator');

const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('lastName').optional().notEmpty().withMessage('Last name is required'),
];

const requestPasswordResetValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
];

const resetPasswordValidation = [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
    registerValidation,
    requestPasswordResetValidation,
    resetPasswordValidation,
    loginValidation,
};
