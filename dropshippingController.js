const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Store = require('../models/Store');

// @desc    Import product from supplier
// @route   POST /api/v1/dropshipping/import
// @access  Private/Seller
exports.importProduct = async (req, res, next) => {
    try {
        const { supplierId, supplierProductId, markupPercentage } = req.body;

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }

        const store = await Store.findOne({ owner: req.user.id });
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        // Mocking fetching data from supplier API
        const supplierProductData = {
            name: `Imported ${supplierProductId}`,
            description: 'High quality product imported from ' + supplier.name,
            price: 100, // Base price from supplier
            category: '65e71234567890abcdef1234', // Mock category ID
            images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600' }]
        };

        const sellingPrice = supplierProductData.price * (1 + markupPercentage / 100);

        const product = await Product.create({
            name: supplierProductData.name,
            description: supplierProductData.description,
            price: {
                original: sellingPrice,
                selling: sellingPrice
            },
            images: supplierProductData.images,
            category: supplierProductData.category,
            store: store._id,
            seller: req.user.id,
            stock: { quantity: 999 }, // Dropshipping usually has infinite or sync-based stock
            isDropshipping: true,
            supplier: supplierId,
            supplierProductId: supplierProductId
        });

        res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all suppliers
// @route   GET /api/v1/dropshipping/suppliers
// @access  Private/Seller
exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find({ isActive: true });
        res.status(200).json({ success: true, count: suppliers.length, data: suppliers });
    } catch (err) {
        next(err);
    }
};
