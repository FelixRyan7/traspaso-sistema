const AppError = require("../helpers/AppError");

const requireRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("No autenticado", "UNAUTHORIZED", 401));
    }

    if (!roles.includes(user.role)) {
      return next(
        new AppError("Sin permisos", "FORBIDDEN", 403)
      );
    }

    next();
  };
};

module.exports = requireRoles