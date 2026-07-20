const AppError = require("../helpers/AppError");
const { verifyAccessToken } = require("../helpers/jwt");

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

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();

  } catch (error) {
   if (process.env.NODE_ENV !== "production") {
    console.error("[AUTH]", error);
}
    
    if(error.name==="TokenExpiredError"){
      new AppError(
          "Tu sesión ha expirado",
          "TOKEN_EXPIRED",
          401
      );
    }

    // 🔴 TOKEN ALTERADO o FIRMA INVALIDA
    if(error.name==="JsonWebTokenError"){
      new AppError(
          "Token inválido",
          "INVALID_TOKEN",
          401
      );
    }

   return next(error);
  }
};

module.exports = authMiddleware;
