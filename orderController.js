const Order = require('../models/Order');
const Product = require('../models/Product');
const Store = require('../models/Store');
const Cart = require('../models/User'); // Cart is within user model in this case

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, pricing, payment } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Order must contain items' });
        }

        const order = await Order.create({
            customer: req.user.id,
            items,
            shippingAddress,
            pricing,
            payment,
        });

        // Update product stock and stats
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock.quantity -= item.quantity;
                await product.save();
            }
        }

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', 'name email avatar')
            .populate('items.product', 'name images price')
            .populate('items.store', 'name slug logo');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Checking permissions
        if (order.customer._id.toString() !== req.user.id && req.user.role !== 'seller' && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized for this order' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my orders (Customer)
// @route   GET /api/v1/orders/me
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        next(err);
    }
};

// @desc    Get seller orders
// @route   GET /api/v1/orders/seller
// @access  Private/Seller
exports.getSellerOrders = async (req, res, next) => {
    try {
        const store = await Store.findOne({ owner: req.user.id });
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        // Find orders where any item belongs to this store
        const orders = await Order.find({
            'items.store': store._id,
        }).sort('-createdAt');

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Seller/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status, itemId } = req.body;
        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // If seller updating they only update their items
        if (req.user.role === 'seller') {
            const store = await Store.findOne({ owner: req.user.id });
            order.items.forEach((item) => {
                if (item.store.toString() === store._id.toString() && (!itemId || item._id.toString() === itemId)) {
                    item.status = status;
                    if (status === 'shipped') item.shippedAt = Date.now();
                    if (status === 'delivered') item.deliveredAt = Date.now();
                }
            });

            // Checking if all items overall are updated to a final state
            const allDelivered = order.items.every(i => i.status === 'delivered');
            if (allDelivered) {
                order.status = 'delivered';
                order.deliveredAt = Date.now();
            }
        } else if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            order.status = status;
        }

        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};
