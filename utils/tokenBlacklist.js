const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Defines the TokenBlacklist model for storing invalidated tokens.
 */
const TokenBlacklist = sequelize.define(
    'TokenBlacklist',
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'CreatedAt', // ✅ Ensure it matches the actual DB column
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'UpdatedAt', // ✅ Ensure it matches the actual DB column
        },
    },
    {
        tableName: 'TokenBlacklist',
        timestamps: true, // ✅ Keep timestamps but explicitly define columns
    }
);

/**
 * Adds a token to the blacklist.
 */
const blacklistToken = async (token) => {
    await TokenBlacklist.create({ token });
};

/**
 * Checks if a token is blacklisted.
 */
const isTokenBlacklisted = async (token) => {
    const blacklistedToken = await TokenBlacklist.findOne({ where: { token } });
    return !!blacklistedToken;
};

module.exports = { TokenBlacklist, blacklistToken, isTokenBlacklisted };
