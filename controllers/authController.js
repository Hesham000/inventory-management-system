const User = require('../models/user');
const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const { generateToken, hashPassword, comparePassword, generateVerificationToken } = require('../utils/authUtils');
const { blacklistToken, isTokenBlacklisted } = require('../utils/tokenBlacklist');
const jwt = require('jsonwebtoken');

class AuthController {
    static async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, email, password, firstName, lastName } = req.body;

            const existingUser = await User.findOne({ where: { Email: email } });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            const hashedPassword = await hashPassword(password);
            const verificationToken = generateVerificationToken();

            const user = await User.create({
                Username: username,
                Email: email,
                Password: hashedPassword,
                FirstName: firstName,
                LastName: lastName,
                IsActive: false,
                VerificationToken: verificationToken,
            });

            await emailService.sendVerificationEmail(email, verificationToken);

            res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
        } catch (error) {
            next(error);
        }
    }

    static async verifyEmail(req, res, next) {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ message: 'Verification token is required' });
            }

            const user = await User.findOne({ where: { VerificationToken: token } });
            if (!user) {
                return res.status(404).json({ message: 'Invalid or expired token' });
            }

            user.IsActive = true;
            user.VerificationToken = null;
            await user.save();

            res.json({ message: 'Email verified successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async requestPasswordReset(req, res, next) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { Email: email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resetToken = generateVerificationToken();
            user.ResetToken = resetToken;
            await user.save();

            await emailService.sendPasswordResetEmail(email, resetToken);

            res.json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            next(error);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;

            const user = await User.findOne({ where: { ResetToken: token } });

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired reset token' });
            }

            user.Password = await hashPassword(newPassword);
            user.ResetToken = null;
            await user.save();

            res.json({ message: 'Password has been reset successfully' });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            console.log('Login attempt with:', email, password);

            const user = await User.findOne({ where: { Email: email } });

            console.log('User found:', user ? user.toJSON() : 'No user found');
            console.log('Stored hashed password:', user ? user.Password : 'No password found');

            if (!user || !(await comparePassword(password, user.Password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = generateToken(user);
            res.json({ message: 'Logged in successfully', token });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Logs out a user by blacklisting the token in the database.
     */
    static async logout(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(400).json({ message: 'Invalid token format' });
            }

            const token = authHeader.split(' ')[1];

            // Add token to the blacklist database
            await blacklistToken(token);

            res.status(200).json({ message: 'User logged out successfully. Token invalidated.' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to logout. Please try again.', error: error.message });
        }
    }

    /**
     * Middleware to authenticate users via JWT, ensuring the token is not blacklisted.
     */
    static async authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token required' });
            }

            const token = authHeader.split(' ')[1];

            // Check if the token is blacklisted in the database
            if (await isTokenBlacklisted(token)) {
                return res.status(401).json({ message: 'Token has been invalidated. Please log in again.' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token', error: error.message });
        }
    }
}

module.exports = AuthController;
