const AppError = require('../helpers/AppError');
const authService = require('../services/auth.service')
const Session = require("../models/Session");
require('dotenv').config();

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  const result = await authService.register({
    nombre,
    email,
    password
  });

  return res.status(201).json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("LOGIN RECIBIDO");
  

  const { accessToken, refreshToken, user, sessionId } =
    await authService.login({
      username,
      password,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });

  const refreshExpiresDays = Number(process.env.REFRESH_EXPIRES_DAYS);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
    process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: refreshExpiresDays * 24 * 60 * 60 * 1000,
  });
  

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
    process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: refreshExpiresDays * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    accessToken,
    user
  });
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const sessionId = req.cookies?.sessionId;

  const { accessToken, user } = await authService.refresh({
    sessionId,
    refreshToken,
  });

  return res.status(200).json({
    accessToken,
    user,
  });
};

const logout = async (req, res) => {
  const sessionId = req.cookies?.sessionId;

  if (sessionId) {
    await authService.logout(sessionId);
  }

  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");

  return res.status(200).json({ message: "Logged out" });
};


/* const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const sessionId = req.cookies?.sessionId;

    const { accessToken, user } = await authService.refresh({
      sessionId,
      refreshToken,
    });

    return res.status(200).json({
      accessToken,
      user,
    });

  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.status).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado. Inténtalo más tarde.",
    },
  });
  }
}; */



module.exports = {
  register, login, refresh, logout
};
