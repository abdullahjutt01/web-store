const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional for styling output
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Store = require('../models/Store');

dotenv.config({ path: './.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ultramart_ai';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Clean current data
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await Store.deleteMany();

        // 1. Create Admins
        const admin = await User.create({
            name: 'Super Admin',
            email: 'superadmin@ultramart.com',
            password: 'Admin@12345',
            role: 'superadmin',
            isEmailVerified: true
        });

        const standardAdmin = await User.create({
            name: 'Admin',
            email: 'admin@ultramart.com',
            password: 'Admin@12345',
            role: 'admin',
            isEmailVerified: true
        });

        // 2. Create Categories
        const electronics = await Category.create({
            name: 'Electronics',
            slug: 'electronics',
            description: 'Latest gadgets and tech',
            icon: '📱'
        });

        const fashion = await Category.create({
            name: 'Fashion',
            slug: 'fashion',
            description: 'Trendy clothing and accessories',
            icon: '👕'
        });

        const home = await Category.create({
            name: 'Home & Kitchen',
            slug: 'home-kitchen',
            description: 'Quality appliances and decor',
            icon: '🍳'
        });

        // 3. Create Sellers and Stores
        const seller = await User.create({
            name: 'Top Seller',
            email: 'seller@ultramart.com',
            password: 'Seller@1234',
            role: 'seller',
            isEmailVerified: true
        });

        const store = await Store.create({
            owner: seller._id,
            name: 'Ultra Electronics Store',
            slug: 'ultra-electronics',
            description: 'Your one-stop shop for premium gadgets.',
            status: 'active',
            isVerified: true
        });

        // 4. Create Sample Products
        const products = [
            {
                name: 'iPhone 15 Pro Max',
                description: 'Titanium design, A17 Pro chip, powerful camera system.',
                price: { original: 450000, selling: 420000 },
                category: electronics._id,
                store: store._id,
                seller: seller._id,
                stock: { quantity: 50 },
                images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop' }],
                brand: 'Apple',
                tags: ['smartphone', 'apple', 'ios'],
                isFeatured: true
            },
            {
                name: 'Sony WH-1000XM5',
                description: 'Industry-leading noise canceling headphones.',
                price: { original: 95000, selling: 88000 },
                category: electronics._id,
                store: store._id,
                seller: seller._id,
                stock: { quantity: 30 },
                images: [{ url: 'https://images.unsplash.com/photo-1618366712277-7c033789b533?q=80&w=2070&auto=format&fit=crop' }],
                brand: 'Sony',
                tags: ['audio', 'headphones', 'sony']
            },
            {
                name: 'Designer Slim Fit Suit',
                description: 'Premium quality wool-blend suit for formal events.',
                price: { original: 45000, selling: 35000 },
                category: fashion._id,
                store: store._id,
                seller: seller._id,
                stock: { quantity: 15 },
                images: [{ url: 'https://images.unsplash.com/photo-1594932224828-b4b059b8ff6d?q=80&w=2070&auto=format&fit=crop' }],
                brand: 'UltraStyle',
                tags: ['formal', 'clothing', 'fashion']
            }
        ];

        await Product.create(products);

        // 5. Create Sample Customer
        await User.create({
            name: 'John Doe',
            email: 'customer@ultramart.com',
            password: 'User@123456',
            role: 'customer',
            isEmailVerified: true
        });

        console.log('✅ Data Seeding Completed Successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
