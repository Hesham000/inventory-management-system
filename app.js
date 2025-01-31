// Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // For logging requests
const helmet = require('helmet'); // For securing HTTP headers
const rateLimit = require('express-rate-limit'); // For rate limiting
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const roleRoutes = require('./routes/roleRoutes')
const permissionRoutes = require('./routes/permissionRoutes')
const rolePermissionRoutes = require('./routes/rolePermissionRoutes')
const sequelize = require('./config/db'); // Import the database connection
const { requestLogger, authenticate, errorHandler } = require('./middlewares/middleware'); // Import middleware

const app = express();

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log requests to the console
app.use(requestLogger); // Use request logging middleware

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({ message: 'Database connection successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/role', roleRoutes);
app.use('/api/permissionRoutes',permissionRoutes);
app.use('/api/rolePermissionRoutes', rolePermissionRoutes);
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/nlu', require('./routes/nluRoutes'));
app.use('/api/item', require('./routes/itemRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Use error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate(); // Check database connection on server start
        console.log(`Database connection successful!`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;