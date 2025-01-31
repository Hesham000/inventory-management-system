const OrderDetail = require('../models/orderDetail');
const Order = require('../models/order');
const Item = require('../models/item');

class OrderDetailController {
    // Create a new order detail
    static async createOrderDetail(req, res, next) {
        try {
            const { OrderID, ItemID, Quantity, Price, Discount } = req.body;
            if (!OrderID || !ItemID || !Quantity || !Price) {
                return res.status(400).json({ message: 'OrderID, ItemID, Quantity, and Price are required' });
            }

            const orderDetail = await OrderDetail.create({ OrderID, ItemID, Quantity, Price, Discount });
            res.status(201).json({ message: 'Order detail created successfully', orderDetail });
        } catch (error) {
            next(error);
        }
    }

    // Get all order details
    static async getAllOrderDetails(req, res, next) {
        try {
            const orderDetails = await OrderDetail.findAll({
                include: [
                    { model: Order, attributes: ['OrderID', 'OrderDate'] },
                    { model: Item, attributes: ['ItemName', 'Price'] }
                ]
            });
            res.json(orderDetails);
        } catch (error) {
            next(error);
        }
    }

    // Get an order detail by ID
    static async getOrderDetailById(req, res, next) {
        try {
            const { id } = req.params;
            const orderDetail = await OrderDetail.findByPk(id, {
                include: [
                    { model: Order, attributes: ['OrderID', 'OrderDate'] },
                    { model: Item, attributes: ['ItemName', 'Price'] }
                ]
            });

            if (!orderDetail) {
                return res.status(404).json({ message: 'Order detail not found' });
            }

            res.json(orderDetail);
        } catch (error) {
            next(error);
        }
    }

    // Update an order detail
    static async updateOrderDetail(req, res, next) {
        try {
            const { id } = req.params;
            const { OrderID, ItemID, Quantity, Price, Discount } = req.body;

            const orderDetail = await OrderDetail.findByPk(id);
            if (!orderDetail) {
                return res.status(404).json({ message: 'Order detail not found' });
            }

            orderDetail.OrderID = OrderID || orderDetail.OrderID;
            orderDetail.ItemID = ItemID || orderDetail.ItemID;
            orderDetail.Quantity = Quantity || orderDetail.Quantity;
            orderDetail.Price = Price || orderDetail.Price;
            orderDetail.Discount = Discount || orderDetail.Discount;
            await orderDetail.save();

            res.json({ message: 'Order detail updated successfully', orderDetail });
        } catch (error) {
            next(error);
        }
    }

    // Delete an order detail
    static async deleteOrderDetail(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await OrderDetail.destroy({ where: { OrderDetailID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Order detail not found' });
            }

            res.json({ message: 'Order detail deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderDetailController; 