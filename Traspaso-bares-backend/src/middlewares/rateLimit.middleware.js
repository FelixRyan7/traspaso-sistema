const rateLimit = require("express-rate-limit");
const AppError = require("../helpers/AppError");

const apiLimiter = rateLimit({
  windowMs: Number(process.env.API_RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.API_RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    return next(
      new AppError(
        "Has realizado demasiadas peticiones. Inténtalo de nuevo más tarde.",
        "RATE_LIMIT_EXCEEDED",
        429
      )
    );
  },
});

const loginLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    return next(
      new AppError(
        "Demasiados intentos de inicio de sesión. Inténtalo de nuevo en unos minutos.",
        "TOO_MANY_LOGIN_ATTEMPTS",
        429
      )
    );
  },
});


module.exports = {
  apiLimiter,
  loginLimiter,
};