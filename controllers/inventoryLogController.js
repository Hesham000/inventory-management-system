const InventoryLog = require('../models/inventoryLog');
const Item = require('../models/item');

class InventoryLogController {
    // Create a new inventory log entry
    static async createInventoryLog(req, res, next) {
        try {
            const { ItemID, Data, ChangeQuantity, CurrentQuantity, Notes } = req.body;
            if (!ItemID || !Data || !ChangeQuantity || !CurrentQuantity) {
                return res.status(400).json({ message: 'ItemID, Data, ChangeQuantity, and CurrentQuantity are required' });
            }

            const inventoryLog = await InventoryLog.create({ ItemID, Data, ChangeQuantity, CurrentQuantity, Notes });
            res.status(201).json({ message: 'Inventory log entry created successfully', inventoryLog });
        } catch (error) {
            next(error);
        }
    }

    // Get all inventory log entries
    static async getAllInventoryLogs(req, res, next) {
        try {
            const inventoryLogs = await InventoryLog.findAll({
                include: [
                    { model: Item, attributes: ['ItemName'] }
                ]
            });
            res.json(inventoryLogs);
        } catch (error) {
            next(error);
        }
    }

    // Get an inventory log entry by ID
    static async getInventoryLogById(req, res, next) {
        try {
            const { id } = req.params;
            const inventoryLog = await InventoryLog.findByPk(id, {
                include: [
                    { model: Item, attributes: ['ItemName'] }
                ]
            });

            if (!inventoryLog) {
                return res.status(404).json({ message: 'Inventory log entry not found' });
            }

            res.json(inventoryLog);
        } catch (error) {
            next(error);
        }
    }

    // Update an inventory log entry
    static async updateInventoryLog(req, res, next) {
        try {
            const { id } = req.params;
            const { ItemID, Data, ChangeQuantity, CurrentQuantity, Notes } = req.body;

            const inventoryLog = await InventoryLog.findByPk(id);
            if (!inventoryLog) {
                return res.status(404).json({ message: 'Inventory log entry not found' });
            }

            inventoryLog.ItemID = ItemID || inventoryLog.ItemID;
            inventoryLog.Data = Data || inventoryLog.Data;
            inventoryLog.ChangeQuantity = ChangeQuantity || inventoryLog.ChangeQuantity;
            inventoryLog.CurrentQuantity = CurrentQuantity || inventoryLog.CurrentQuantity;
            inventoryLog.Notes = Notes || inventoryLog.Notes;
            await inventoryLog.save();

            res.json({ message: 'Inventory log entry updated successfully', inventoryLog });
        } catch (error) {
            next(error);
        }
    }

    // Delete an inventory log entry
    static async deleteInventoryLog(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await InventoryLog.destroy({ where: { LogID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Inventory log entry not found' });
            }

            res.json({ message: 'Inventory log entry deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = InventoryLogController; 