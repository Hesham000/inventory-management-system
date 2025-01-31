const Order = require('../models/order');
const { nlu } = require('../config/ibmConfig');

class OrderController {
    // Create a new order
    static async createOrder(req, res, next) {
        try {
            const { CustomerID, CreatedByUserID, ModifiedByUserID, OrderDate, RequiredDate, ShippedDate, Status } = req.body;
            if (!CustomerID || !CreatedByUserID || !OrderDate) {
                return res.status(400).json({ message: 'CustomerID, CreatedByUserID, and OrderDate are required' });
            }

            const order = await Order.create({ CustomerID, CreatedByUserID, ModifiedByUserID, OrderDate, RequiredDate, ShippedDate, Status });
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            next(error);
        }
    }

    // Get all orders
    static async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    // Get an order by ID
    static async getOrderById(req, res, next) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    // Update an order
    static async updateOrder(req, res, next) {
        try {
            const { id } = req.params;
            const { CustomerID, CreatedByUserID, ModifiedByUserID, OrderDate, RequiredDate, ShippedDate, Status } = req.body;

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.CustomerID = CustomerID || order.CustomerID;
            order.CreatedByUserID = CreatedByUserID || order.CreatedByUserID;
            order.ModifiedByUserID = ModifiedByUserID || order.ModifiedByUserID;
            order.OrderDate = OrderDate || order.OrderDate;
            order.RequiredDate = RequiredDate || order.RequiredDate;
            order.ShippedDate = ShippedDate || order.ShippedDate;
            order.Status = Status || order.Status;
            await order.save();

            res.json({ message: 'Order updated successfully', order });
        } catch (error) {
            next(error);
        }
    }

    // Delete an order
    static async deleteOrder(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Order.destroy({ where: { OrderID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.json({ message: 'Order deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Analyze customer feedback
    static async analyzeFeedback(req, res, next) {
        try {
            const { feedback } = req.body;
            if (!feedback) {
                return res.status(400).json({ message: 'Feedback is required for analysis' });
            }

            const analyzeParams = {
                text: feedback,
                features: {
                    sentiment: {},
                    emotion: {},
                },
            };

            const analysisResults = await nlu.analyze(analyzeParams);
            res.json(analysisResults.result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController; 