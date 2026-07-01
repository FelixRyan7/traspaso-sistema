const jwt = require("jsonwebtoken");
const AppError = require("../helpers/AppError");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("No token provided", "NO_TOKEN", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Formato inválido", "BAD_TOKEN_FORMAT", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    console.error("[AUTH_MIDDLEWARE_ERROR]", error);
    
    // 🟡 TOKEN EXPIRADO → hacemos refresh
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: {
          code: "TOKEN_EXPIRED",
          message: "Tu sesión ha expirado",
        },
      });
    }

    // 🔴 TOKEN ALTERADO o FIRMA INVALIDA
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: {
          code: "INVALID_TOKEN",
          message: "Token inválido",
        },
      });
    }

    // 🟠 ERRORES CONTROLADOS DE APP
    if (error instanceof AppError) {
      return res.status(error.status).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    // 🔥 ERROR INESPERADO (fallback seguro)
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Error interno del servidor",
      },
    });
  }
};

module.exports = authMiddleware;
