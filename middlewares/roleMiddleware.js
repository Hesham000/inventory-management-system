const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
const Permission = require('../models/permission');
const RolePermission = require('../models/rolePermission');

/**
 * Middleware to authorize users based on required permissions.
 * @param {Array} requiredPermissions - List of required permission names.
 */
const authorize = (requiredPermissions) => async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        // Extract and verify token
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Fetch user along with role and permissions
        const user = await User.findByPk(decoded.userId, {
            include: [
                {
                    model: Role,
                    include: [
                        {
                            model: Permission,
                            through: RolePermission, // Many-to-Many Relationship
                        }
                    ]
                }
            ]
        });

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Extract user's permissions
        const userPermissions = user.Role.Permissions.map(p => p.PermissionName);
        
        // Check if user has at least one of the required permissions
        const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));

        if (!hasPermission) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        // Proceed to next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = { authorize };
