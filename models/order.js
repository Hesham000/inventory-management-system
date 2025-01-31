const { Model,DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Order extends Model {}

Order.init({
    OrderID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    CustomerID: DataTypes.INTEGER,
    CreatedByUserID: DataTypes.INTEGER,
    ModifiedByUserID: DataTypes.INTEGER,
    OrderDate: DataTypes.DATE,
    RequiredDate: DataTypes.DATE,
    ShippedDate: DataTypes.DATE,
    Status: DataTypes.STRING(50)
}, {sequelize, modelName: 'Order', tableName: 'orders' });

Order.belongsTo(Customer, { foreignKey: 'CustomerID' });
Order.belongsTo(User, {foreignKey: 'CreatedByUserID'});
Order.belongsTo(User, {foreignKey: 'ModifiedByUserID'});

module.exports = Order;