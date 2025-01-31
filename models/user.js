const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'UserID'  // Matches the exact column name in your database
    },
    Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        field: 'Username'
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'Password'
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'Email'
    },
    FirstName: {
        type: DataTypes.STRING(100),
        field: 'FirstName'  // Optional fields do not require allowNull if they match the DB
    },
    LastName: {
        type: DataTypes.STRING(100),
        field: 'LastName'
    },
    Role: {
        type: DataTypes.STRING(50),
        defaultValue: 'User',
        field: 'Role'
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt'
    },
    UpdateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'UpdateAt'
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'IsActive'
    },
    VerificationToken: {
        type: DataTypes.STRING,
        field: 'VerificationToken'
    },
    ResetToken: {
        type: DataTypes.STRING,
        field: 'ResetToken'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Explicitly specify the table name if it differs from the model name
    timestamps: false, // Set to false if createdAt and updatedAt are manually defined
    hooks: {
        beforeCreate: async (user) => {
            if (user.Password && !user.Password.startsWith('$2b$')) {  // Ensure it's not already hashed
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('Password') && !user.Password.startsWith('$2b$')) {
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        }
    }
    
});

module.exports = User;
