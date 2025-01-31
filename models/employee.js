const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Employee extends Model {}

Employee.init({
    EmployeeID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FirstName: DataTypes.STRING(100),
    LastName: DataTypes.STRING(100),
    Position: DataTypes.STRING(100),
    Email: DataTypes.STRING(100),
    Phone: DataTypes.STRING(20)
}, {sequelize, modelName:'Employee'});

module.exports = Employee;