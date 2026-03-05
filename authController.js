const User = require('../models/User');
const Store = require('../models/Store');
const Notification = require('../models/Notification');
const sendEmail = require('../utils/sendEmail');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const allowedRoles = ['customer', 'seller'];
        const userRole = allowedRoles.includes(role) ? role : 'customer';

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

        const user = await User.create({ name, email, password, role: userRole });

        // If seller, create a store shell
        if (userRole === 'seller') {
            await Store.create({
                owner: user._id,
                name: `${name}'s Store`,
                slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                status: 'pending',
            });
        }

        // Welcome notification
        await Notification.create({
            recipient: user._id,
            type: 'system',
            title: 'Welcome to UltraMart AI! 🎉',
            message: `Hello ${name}, your account has been created successfully.`,
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Please provide email and password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        if (!user.isActive || user.isBanned)
            return res.status(403).json({ success: false, message: 'Account suspended. Contact support.' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged-in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        let store = null;
        if (user.role === 'seller') {
            store = await Store.findOne({ owner: user._id }).select('name slug logo status isVerified');
        }
        res.status(200).json({ success: true, data: { user, store } });
    } catch (err) {
        next(err);
    }
};

// @desc    Update profile
// @route   PUT /api/v1/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, phone, dateOfBirth, gender } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, dateOfBirth, gender },
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

// @desc    Change password
// @route   PUT /api/v1/auth/change-password
// @access  Private
exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch)
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        user.password = newPassword;
        await user.save();
        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ success: false, message: 'No user with that email' });
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'UltraMart AI — Password Reset',
                html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 10 minutes.</p>`,
            });
            res.status(200).json({ success: true, message: 'Reset email sent' });
        } catch {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (err) {
        next(err);
    }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
    try {
        const crypto = require('crypto');
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Logout
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Helper: send JWT in response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            loyaltyPoints: user.loyaltyPoints,
        },
    });
};
