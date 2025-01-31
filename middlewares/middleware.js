const jwt = require('jsonwebtoken');

// Middleware to log requests
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Middleware to authenticate JWT tokens
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
    requestLogger,
    authenticate,
    errorHandler,
};
