const Role = require('../models/role');
const Permission = require('../models/permission');
const RolePermission = require('../models/rolePermission');

async function seedDatabase() {
    await Role.bulkCreate([
        { RoleID: 1, RoleName: 'Admin' },
        { RoleID: 2, RoleName: 'Manager' },
        { RoleID: 3, RoleName: 'User' }
    ]);

    await Permission.bulkCreate([
        { PermissionID: 1, PermissionName: 'manage_users' },
        { PermissionID: 2, PermissionName: 'manage_orders' },
        { PermissionID: 3, PermissionName: 'manage_inventory' }
    ]);

    await RolePermission.bulkCreate([
        { RoleID: 1, PermissionID: 1 },
        { RoleID: 1, PermissionID: 2 },
        { RoleID: 1, PermissionID: 3 }
    ]);

    console.log('✅ Roles & Permissions Seeded');
}

seedDatabase();
