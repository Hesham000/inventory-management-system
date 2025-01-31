const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class InventoryLog extends Model {}

InventoryLog.init({
    LogID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ItemID: DataTypes.INTEGER,
    Data: DataTypes.DATE,
    ChangeQuantity: DataTypes.INTEGER,
    CurrentQuantity: DataTypes.INTEGER,
    Notes:DataTypes.TEXT
}, {sequelize, modelName: 'InventoryLog'});

InventoryLog.belongsTo(Item, {foreignKey:'ItemID'});

module.exports = InventoryLog;