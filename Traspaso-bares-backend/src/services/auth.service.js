const bcrypt = require('bcrypt');
const validator = require('validator');
const { Session, User } = require("../models");
const AppError = require('../helpers/AppError')
const crypto = require("crypto")
const { Op } = require("sequelize");
require('dotenv').config();
const {
  generateAccessToken,
} = require("../helpers/jwt");

// funcion para manejar el registro del usuario en nuestra plataforma
const register = async ({ nombre, email, password }) => {

  // 🔹 1. Validación de existencia
  if (!nombre || !email || !password) {
    throw new AppError(
      'Todos los campos son obligatorios',
      'MISSING_FIELDS',
      400
    );
  }

  // 🔹 2. Validaciones por campo (mejor agrupadas)
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = 'Email no válido';
  }

  if (!validator.isLength(password, { min: 6 })) {
    errors.password = 'Debe tener al menos 6 caracteres';
  }

  if (!validator.isLength(nombre, { min: 2 })) {
    errors.nombre = 'El nombre es demasiado corto';
  }

  if (Object.keys(errors).length > 0) {
    throw new AppError(
      'Error de validación',
      'VALIDATION_ERROR',
      400,
      errors
    );
  }

  // 🔹 3. Sanitización
  const cleanNombre = validator.escape(nombre.trim());
  const cleanEmail = validator.normalizeEmail(email);

  // 🔹 4. Comprobar si ya existe
  const existingUser = await User.findOne({
    where: { email: cleanEmail }
  });

  if (existingUser) {
    throw new AppError(
      'Este usuario ya está registrado',
      'USER_ALREADY_EXISTS',
      409
    );
  }

  // 🔹 5. Hash de contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔹 6. Crear usuario
  const user = await User.create({
    nombre: cleanNombre,
    email: cleanEmail,
    password: hashedPassword
  });

  // 🔹 8. Respuesta limpia
  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    }
  };
};

// funcion para gestionar el login del usuario a nuestra plataforma
const login = async ({ username, password, userAgent, ip }) => {
  // Borramos sesiones caducadas y revocadas
  Session.destroy({
  where: {
    revoked: true,
    expiresAt: { [Op.lt]: new Date() }
  }
}).catch(() => {});

  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new AppError(
      "Credenciales inválidas",
      "INVALID_CREDENTIALS",
      401
    );
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new AppError(
      "Credenciales inválidas",
      "INVALID_CREDENTIALS",
      401
    ); 
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = crypto.randomBytes(64).toString("hex");;

  const refreshExpiresDays = Number(process.env.REFRESH_EXPIRES_DAYS);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshExpiresDays);

  // REVOCAR sesiones anteriores (1 sesión por usuario para MVP)
  await Session.update(
    { revoked: true },
    { where: { userId: user.id, revoked: false } }
  );
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  // CREAR nueva sesión
  const session = await Session.create({
    userId: user.id,
    refreshToken: hashedRefreshToken,
    expiresAt,
    userAgent,
    ip
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      operationalArea: user.operationalArea
    },
    sessionId: session.id
  };
};

// Logica para validar que el refresh token sigue vigente y valido y retornar nuevo access token
const refresh = async ({ sessionId, refreshToken }) => {

 if (!refreshToken) {
  throw new AppError("No refresh token", "NO_REFRESH_TOKEN", 401);
}

if (!sessionId) {
  throw new AppError("No session", "NO_SESSION", 401);
}

  // 1. buscar sesión
  const session = await Session.findByPk(sessionId);

  if (!session) {
    throw new AppError("Sesión invalida", "INVALID_SESSION", 401);
  }

  // 2. comprobar si está revocada
  if (session.revoked) {
    throw new AppError("Sesión revocada", "REVOKED_SESSION", 401);
  }

  // 3. comprobar expiración
  if (session.expiresAt < new Date()) {
    session.revoked = true; 
    await session.save();
    throw new AppError("Sesión expirada", "EXPIRED_SESSION", 401);
  }

  // 4. comparar refresh token hasheado
  const isValid = await bcrypt.compare(
    refreshToken,
    session.refreshToken
  );

  if (!isValid) {
    session.revoked = true; 
    await session.save();
    throw new AppError("Refresh token inválido", "INVALID_REFRESH", 401);
  }

  // 5. obtener usuario
  const user = await User.findByPk(session.userId);

  if (!user) {
    throw new AppError("Usuario no encontrado", "USER_NOT_FOUND", 404);
  }

  // 6. generar nuevo access token
  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    }
  };
};

const logout = async (sessionId) => {
  if (!sessionId) return;

  await Session.update(
    { revoked: true },
    { where: { id: sessionId } }
  );
}

module.exports = {
  register, login, refresh, logout
};
