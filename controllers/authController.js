const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, email, and password'
            });
        }
        
        // Check if user already exists
        const existingUserByEmail = await User.findByEmail(email);
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        
        const existingUserByUsername = await User.findByUsername(username);
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken'
            });
        }
        
        // Create user
        const userId = await User.create({ username, email, password });
        const token = generateToken(userId);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                userId,
                username,
                email,
                token
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }
        
        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        // Validate password
        const isValidPassword = await User.validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        // Generate token
        const token = generateToken(user.id);
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                userId: user.id,
                username: user.username,
                email: user.email,
                token
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    register,
    login
};