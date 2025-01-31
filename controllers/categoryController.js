const Category = require('../models/category');

class CategoryController {
    // Create a new category
    static async createCategory(req, res, next) {
        try {
            const { CategoryName, Description } = req.body;
            if (!CategoryName) {
                return res.status(400).json({ message: 'CategoryName is required' });
            }

            const category = await Category.create({ CategoryName, Description });
            res.status(201).json({ message: 'Category created successfully', category });
        } catch (error) {
            next(error);
        }
    }

    // Get all categories
    static async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    // Get a category by ID
    static async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    // Update a category
    static async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { CategoryName, Description } = req.body;

            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.CategoryName = CategoryName || category.CategoryName;
            category.Description = Description || category.Description;
            await category.save();

            res.json({ message: 'Category updated successfully', category });
        } catch (error) {
            next(error);
        }
    }

    // Delete a category
    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Category.destroy({ where: { CategoryID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController; 