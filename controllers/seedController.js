const User = require('../models/User');

// Endpoint para poblar la base de datos con usuarios de prueba
exports.seedUsers = async (req, res) => {
  try {
    const users = [
      {
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        permissions: [
          'users.create', 'users.read', 'users.update', 'users.delete',
          'roles.admin', 'modules.admin'
        ],
        isActive: true
      },
      {
        email: 'manager@example.com',
        password: 'manager123',
        firstName: 'Manager',
        lastName: 'User',
        role: 'manager',
        permissions: [
          'users.read', 'users.update', 'modules.admin'
        ],
        isActive: true
      },
      {
        email: 'user1@example.com',
        password: 'user123',
        firstName: 'User',
        lastName: 'One',
        role: 'user',
        permissions: [
          'users.read'
        ],
        isActive: true
      },
      {
        email: 'user2@example.com',
        password: 'user123',
        firstName: 'User',
        lastName: 'Two',
        role: 'user',
        permissions: [
          'users.read'
        ],
        isActive: false
      }
    ];

    // Elimina usuarios existentes y crea los nuevos
    await User.deleteMany({});
    const created = await User.insertMany(users);
    res.json({ message: 'Usuarios de prueba creados', users: created });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuarios', error: err.message });
  }
};
