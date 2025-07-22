const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login real contra la base de datos
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son requeridos.' });
  }

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Validar password (texto plano)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Actualizar lastLogin
    user.lastLogin = new Date();
    await user.save();

    const expiresIn = 3600; // 1 hora
    const secret = process.env.JWT_SECRET || 'supersecreto';

    // Generar JWT real
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, permissions: user.permissions },
      secret,
      { expiresIn }
    );

    // Simulación de refresh token
    const refreshToken = jwt.sign(
      { id: user._id, type: 'refresh' },
      secret,
      { expiresIn: expiresIn * 24 }
    );

    // No exponer el password en la respuesta
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.json({
      user: userResponse,
      token,
      refreshToken,
      expiresIn
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};
