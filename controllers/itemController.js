const Item = require('../models/item');
const { visualRecognition } = require('../config/ibmConfig');

class ItemController {
    // Create a new item
    static async createItem(req, res, next) {
        try {
            const { ItemName, Description, SupplierID, CategoryID, Price, Quantity, ReorderLevel } = req.body;
            if (!ItemName || !Price || !Quantity) {
                return res.status(400).json({ message: 'ItemName, Price, and Quantity are required' });
            }

            const item = await Item.create({ ItemName, Description, SupplierID, CategoryID, Price, Quantity, ReorderLevel });
            res.status(201).json({ message: 'Item created successfully', item });
        } catch (error) {
            next(error);
        }
    }

    // Get all items
    static async getAllItems(req, res, next) {
        try {
            const items = await Item.findAll();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    // Get an item by ID
    static async getItemById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id);

            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    // Update an item
    static async updateItem(req, res, next) {
        try {
            const { id } = req.params;
            const { ItemName, Description, SupplierID, CategoryID, Price, Quantity, ReorderLevel } = req.body;

            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            item.ItemName = ItemName || item.ItemName;
            item.Description = Description || item.Description;
            item.SupplierID = SupplierID || item.SupplierID;
            item.CategoryID = CategoryID || item.CategoryID;
            item.Price = Price || item.Price;
            item.Quantity = Quantity || item.Quantity;
            item.ReorderLevel = ReorderLevel || item.ReorderLevel;
            await item.save();

            res.json({ message: 'Item updated successfully', item });
        } catch (error) {
            next(error);
        }
    }

    // Delete an item
    static async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Item.destroy({ where: { ItemID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.json({ message: 'Item deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Analyze an item image
    static async analyzeItemImage(req, res, next) {
        try {
            const { imageUrl } = req.body;
            if (!imageUrl) {
                return res.status(400).json({ message: 'Image URL is required' });
            }

            const params = {
                url: imageUrl,
                classifierIds: ['default'],
                threshold: 0.6,
            };

            const analysisResults = await visualRecognition.classify(params);
            res.json(analysisResults.result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ItemController; 