const Role = require('../models/role');

exports.createRole = async (req, res) => {
    try {
        const { RoleName } = req.body;
        if (!RoleName) return res.status(400).json({ message: 'RoleName is required' });

        const role = await Role.create({ RoleName });
        res.status(201).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const deleted = await Role.destroy({ where: { RoleID: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Role not found' });
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
