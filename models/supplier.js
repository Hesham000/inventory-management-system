const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Supplier extends Model {}

Supplier.init({
    SupplierID: { type: DataTypes.INTEGER , primaryKey: true, autoIncrement: true},
    companyName: DataTypes.STRING(255),
    ContactName: DataTypes.STRING(255),
    ContactTitle: DataTypes.STRING(100),
    Address: DataTypes.STRING(255),
    City: DataTypes.STRING(100),
    PostalCode: DataTypes.STRING(20),
    Country: DataTypes.STRING(100),
    Phone: DataTypes.STRING(20),
    Email: DataTypes.STRING(100)
},{sequelize, modelName:'Supplier'});

module.exports = Supplier;