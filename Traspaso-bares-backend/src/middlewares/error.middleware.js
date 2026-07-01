const AppError = require("../helpers/AppError");

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        fields: err.fields || null,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Error inesperado",
    },
  });
};
