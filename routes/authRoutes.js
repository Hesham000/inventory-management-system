const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticate } = require('../middlewares/middleware');
const validateRequest = require('../middlewares/validateRequest');
const {
    registerValidation,
    requestPasswordResetValidation,
    resetPasswordValidation,
    loginValidation,
} = require('../validators/authValidator');

const router = express.Router();

// Register route
router.post('/register', registerValidation, validateRequest, AuthController.register);

// Email verification route
router.get('/verify-email', AuthController.verifyEmail);

// Request password reset route
router.post('/request-password-reset', requestPasswordResetValidation, validateRequest, AuthController.requestPasswordReset);

// Reset password route
router.post('/reset-password', resetPasswordValidation, validateRequest, AuthController.resetPassword);

// Login route
router.post('/login', loginValidation, validateRequest, AuthController.login);

// Logout route (protected)
router.post('/logout', authenticate, AuthController.logout);

module.exports = router;
