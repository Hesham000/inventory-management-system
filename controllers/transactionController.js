const Transaction = require('../models/transaction');
const Item = require('../models/item');
const Employee = require('../models/employee');
const User = require('../models/user');

class TransactionController {
    // Create a new transaction
    static async createTransaction(req, res, next) {
        try {
            const { ItemID, TransactionType, Quantity, TransactionDate, OperatorID, ProcessedByUserID } = req.body;
            if (!ItemID || !TransactionType || !Quantity || !TransactionDate) {
                return res.status(400).json({ message: 'ItemID, TransactionType, Quantity, and TransactionDate are required' });
            }

            const transaction = await Transaction.create({ ItemID, TransactionType, Quantity, TransactionDate, OperatorID, ProcessedByUserID });
            res.status(201).json({ message: 'Transaction created successfully', transaction });
        } catch (error) {
            next(error);
        }
    }

    // Get all transactions
    static async getAllTransactions(req, res, next) {
        try {
            const transactions = await Transaction.findAll({
                include: [
                    { model: Item, attributes: ['ItemName'] },
                    { model: Employee, attributes: ['FirstName', 'LastName'] },
                    { model: User, attributes: ['Username'] }
                ]
            });
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    // Get a transaction by ID
    static async getTransactionById(req, res, next) {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findByPk(id, {
                include: [
                    { model: Item, attributes: ['ItemName'] },
                    { model: Employee, attributes: ['FirstName', 'LastName'] },
                    { model: User, attributes: ['Username'] }
                ]
            });

            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }

    // Update a transaction
    static async updateTransaction(req, res, next) {
        try {
            const { id } = req.params;
            const { ItemID, TransactionType, Quantity, TransactionDate, OperatorID, ProcessedByUserID } = req.body;

            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            transaction.ItemID = ItemID || transaction.ItemID;
            transaction.TransactionType = TransactionType || transaction.TransactionType;
            transaction.Quantity = Quantity || transaction.Quantity;
            transaction.TransactionDate = TransactionDate || transaction.TransactionDate;
            transaction.OperatorID = OperatorID || transaction.OperatorID;
            transaction.ProcessedByUserID = ProcessedByUserID || transaction.ProcessedByUserID;
            await transaction.save();

            res.json({ message: 'Transaction updated successfully', transaction });
        } catch (error) {
            next(error);
        }
    }

    // Delete a transaction
    static async deleteTransaction(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Transaction.destroy({ where: { TransactionID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            res.json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TransactionController; 