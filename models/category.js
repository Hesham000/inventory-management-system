const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Category extends Model {}

Category.init({
    CategoryID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    CategoryName: DataTypes.STRING(100),
    Description: DataTypes.TEXT
}, {sequelize, modelName: 'Category'});

module.exports = Category;