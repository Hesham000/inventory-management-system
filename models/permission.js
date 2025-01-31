const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Permission extends Model {}

Permission.init({
    PermissionID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field:'PermissionID'},
    PermissionName: {type: DataTypes.STRING(100), allowNull: false, field:'PermissionName'}
},{
    sequelize, modelName:'Permission',
    tableName: 'permission', // Ensure this matches your actual MySQL table name
    timestamps: false
});

module.exports = Permission;