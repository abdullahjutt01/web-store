const Store = require('../models/Store');
const slugify = require('slugify');

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  Public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find({ status: 'active' });
        res.status(200).json({ success: true, count: stores.length, data: stores });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single store by slug
// @route   GET /api/v1/stores/:slug
// @access  Public
exports.getStore = async (req, res, next) => {
    try {
        const store = await Store.findOne({ slug: req.params.slug });
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        res.status(200).json({ success: true, data: store });
    } catch (err) {
        next(err);
    }
};

// @desc    Update store (Seller only)
// @route   PUT /api/v1/stores/me
// @access  Private/Seller
exports.updateMyStore = async (req, res, next) => {
    try {
        let store = await Store.findOne({ owner: req.user.id });
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        if (req.body.name) {
            req.body.slug = slugify(req.body.name, { lower: true }) + '-' + Date.now();
        }

        store = await Store.findOneAndUpdate({ owner: req.user.id }, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: store });
    } catch (err) {
        next(err);
    }
};

// @desc    Get store dashboard stats (Seller only)
// @route   GET /api/v1/stores/stats
// @access  Private/Seller
exports.getStoreStats = async (req, res, next) => {
    try {
        const store = await Store.findOne({ owner: req.user.id });
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        // In a real app, calculate these from Order model
        const stats = {
            totalRevenue: store.totalRevenue,
            totalSales: store.totalSales,
            totalOrders: store.totalOrders,
            totalProducts: store.totalProducts,
            balance: store.balance,
            rating: store.rating
        };

        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        next(err);
    }
};
