const Order = require('../models/Order');
const Product = require('../models/Product');
const Store = require('../models/Store');
const mongoose = require('mongoose');

// @desc    Get seller analytics
// @route   GET /api/v1/analytics/seller
// @access  Private/Seller
exports.getSellerAnalytics = async (req, res, next) => {
    try {
        const store = await Store.findOne({ owner: req.user.id });
        if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

        // 1. Total Sales & Revenue (Last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const stats = await Order.aggregate([
            {
                $match: {
                    'items.store': store._id,
                    createdAt: { $gte: thirtyDaysAgo },
                    status: { $ne: 'cancelled' }
                }
            },
            {
                $unwind: '$items'
            },
            {
                $match: {
                    'items.store': store._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$items.subtotal' },
                    totalOrders: { $addToSet: '$_id' },
                    totalItemsSold: { $sum: '$items.quantity' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    totalOrdersCount: { $size: '$totalOrders' },
                    totalItemsSold: 1
                }
            }
        ]);

        // 2. Daily Sales Chart Data
        const chartData = await Order.aggregate([
            {
                $match: {
                    'items.store': store._id,
                    createdAt: { $gte: thirtyDaysAgo },
                    status: { $ne: 'cancelled' }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    revenue: { $sum: '$pricing.total' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 3. Top Products
        const topProducts = await Product.find({ store: store._id })
            .sort('-totalSold')
            .limit(5)
            .select('name totalSold price images');

        res.status(200).json({
            success: true,
            data: {
                summary: stats[0] || { totalRevenue: 0, totalOrdersCount: 0, totalItemsSold: 0 },
                chartData,
                topProducts
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get global admin analytics
// @route   GET /api/v1/analytics/admin
// @access  Private/Admin
exports.getAdminAnalytics = async (req, res, next) => {
    try {
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$pricing.total' } } }
        ]);

        const totalUsers = await mongoose.model('User').countDocuments();
        const totalSellers = await Store.countDocuments({ status: 'active' });
        const totalProducts = await Product.countDocuments();
        const pendingSellers = await Store.countDocuments({ status: 'pending' });

        res.status(200).json({
            success: true,
            data: {
                totalRevenue: totalRevenue[0]?.total || 0,
                totalUsers,
                totalSellers,
                totalProducts,
                pendingSellers
            }
        });
    } catch (err) {
        next(err);
    }
};
