const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
    RoleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'RoleID' }, // Ensure correct field name
    RoleName: { type: DataTypes.STRING(50), allowNull: false, field: 'RoleName' }, // Correct field name
}, { 
    sequelize, 
    modelName: 'Role',
    tableName: 'role', // Ensure this matches your actual MySQL table name
    timestamps: false // Disable timestamps if your table doesn’t have created_at & updated_at
});

module.exports = Role;
