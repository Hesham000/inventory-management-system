const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Item extends Model {}

Item.init({
    ItemID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ItemName: DataTypes.STRING(255),
    Description: DataTypes.TEXT,
    SupplierID: DataTypes.INTEGER,
    CategoryID: DataTypes.INTEGER,
    Price: DataTypes.DECIMAL(10, 2),
    Quantity: DataTypes.INTEGER,
    ReorderLevel: DataTypes.INTEGER,
}, { sequelize, modelName: 'Item'});

Item.belongsTo(Supplier, { foreignKey: 'SupplierID'});
Item.belongsTo(Category, {foreignKey: 'CategoryID'});

module.exports = Item;