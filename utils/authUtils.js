const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generates a JWT token for authentication.
 * @param {Object} user - The user object containing user details.
 * @returns {string} - Signed JWT token.
 */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * Compares a given password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password from DB.
 * @returns {Promise<boolean>} - True if passwords match, otherwise false.
 */
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a secure random token (used for email verification and password reset).
 * @returns {string} - A random token.
 */
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = { generateToken, hashPassword, comparePassword, generateVerificationToken };
