const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class OrderDetail extends Model {}

OrderDetail.init({
    OrderDetailID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    OrderID: DataTypes.INTEGER,
    ItemID: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER,
    Price: DataTypes.DECIMAL(10, 2),
    Discount: DataTypes.DECIMAL(5, 2)
}, {sequelize, modelName: 'OrderDetail'});

OrderDetail.belongsTo(Order, {foreignKey: 'OrderID'});
OrderDetail.belongsTo(Item, {foreignKey: 'ItemID'});

module.exports = OrderDetail;