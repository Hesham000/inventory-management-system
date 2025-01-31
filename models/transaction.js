const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

class Transaction extends Model {}

Transaction.init({
    TransactionID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ItemID: DataTypes.INTEGER,
    TransactionType: DataTypes.STRING(50),
    Quantity: DataTypes.INTEGER,
    TransactionDate: DataTypes.DATE,
    OperatorID: DataTypes.INTEGER,
    ProcessedByUserID: DataTypes.INTEGER
}, {sequelize, modelName: 'Transaction'});

Transaction.belongsTo(Item, {foreignKey: 'ItemID'});
Transaction.belongsTo(Employee, {foreignKey: 'OperatorID'});
Transaction.belongsTo(User, { foreignKey: 'ProcessedByUserID'});

module.exports = Transaction;