const RolePermission = require('../models/rolePermission');

//Assign a permission to a role
exports.assignPermission = async (req, res) => {
    try {
        const { RoleID, PermissionID } = req.body;
        if (!RoleID || !PermissionID) return res.status(400).json({ message: 'Both RoleID and PermissionID are required' });

        const rolePermission = await RolePermission.create({ RoleID, PermissionID });
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all role-permission mappings
exports.getAllRolePermissions = async (req, res) => {
    try {
        const mappings = await RolePermission.findAll();
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
