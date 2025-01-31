const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role');
const Permission = require('./permission');

class RolePermission extends Model {}

RolePermission.init({
    RoleID: { type: DataTypes.INTEGER, primaryKey: true },
    PermissionID: { type: DataTypes.INTEGER, primaryKey: true }
}, { sequelize, modelName: 'RolePermission' });

RolePermission.belongsTo(Role, { foreignKey: 'RoleID' });
RolePermission.belongsTo(Permission, { foreignKey: 'PermissionID' });

module.exports = RolePermission;