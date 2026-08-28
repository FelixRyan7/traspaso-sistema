
const authService = require('../services/auth.service')
const Session = require("../models/Session");
require('dotenv').config();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
};

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

  const { accessToken, refreshToken, user, sessionId } =
    await authService.login({
      username,
      password,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });

  const refreshExpiresDays = Number(process.env.REFRESH_EXPIRES_DAYS);

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: refreshExpiresDays * 24 * 60 * 60 * 1000,
  });

  res.cookie("sessionId", sessionId, {
    ...cookieOptions,
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

  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("sessionId", cookieOptions);

  return res.status(200).json({ message: "Logged out" });
};

module.exports = {
  register, login, refresh, logout
};
