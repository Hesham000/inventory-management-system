const Permission = require('../models/permission');

// Create a new permission
exports.createPermission = async (req, res) => {
    try {
        const { PermissionName } = req.body;
        if (!PermissionName) return res.status(400).json({ message: 'PermissionName is required' });

        const permission = await Permission.create({ PermissionName });
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete permission
exports.deletePermission = async (req, res) => {
    try {
        const deleted = await Permission.destroy({ where: { PermissionID: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Permission not found' });
        res.json({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
