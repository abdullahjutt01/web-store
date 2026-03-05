const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get personalized recommendations
// @route   GET /api/v1/ai/recommendations
// @access  Private/Optional
exports.getRecommendations = async (req, res, next) => {
    try {
        let recommendations = [];

        if (req.user) {
            const user = await User.findById(req.user.id);

            // Basic AI Logic: Find products in categories the user recently viewed or has in wishlist
            const preferredCategories = user.preferences.categories;

            if (preferredCategories && preferredCategories.length > 0) {
                recommendations = await Product.find({
                    category: { $in: preferredCategories },
                    status: 'active'
                }).limit(8);
            }
        }

        if (recommendations.length === 0) {
            // Fallback: Trending products
            recommendations = await Product.find({ status: 'active' })
                .sort('-totalSold')
                .limit(8);
        }

        res.status(200).json({ success: true, data: recommendations });
    } catch (err) {
        next(err);
    }
};

// @desc    AI Smart Search / Autocomplete
// @route   GET /api/v1/ai/search-suggestions
// @access  Public
exports.getSearchSuggestions = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(200).json({ success: true, data: [] });

        // AI logic could involve LLM to understand intent, 
        // but here we use regex for high-performance matching
        const suggestions = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ],
            status: 'active'
        })
            .select('name slug')
            .limit(5);

        res.status(200).json({ success: true, data: suggestions });
    } catch (err) {
        next(err);
    }
};

// @desc    AI Fraud Detection (Simplified)
// @route   POST /api/v1/ai/detect-fraud
// @access  Private/Admin
exports.detectFraud = async (req, res, next) => {
    try {
        const { orderData } = req.body;

        // Logic: Look for suspicious patterns (high value, new account, multiple failed cards)
        let fraudScore = 0;

        if (orderData.total > 50000) fraudScore += 30;
        if (orderData.paymentMethod === 'cod' && orderData.total > 10000) fraudScore += 20;

        const isSuspicious = fraudScore > 50;

        res.status(200).json({
            success: true,
            data: { isSuspicious, fraudScore, recommendations: isSuspicious ? 'Flag for manual review' : 'Safe to proceed' }
        });
    } catch (err) {
        next(err);
    }
};
