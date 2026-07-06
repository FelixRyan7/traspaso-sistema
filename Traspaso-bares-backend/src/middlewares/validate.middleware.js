const AppError = require("../helpers/AppError");


const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;

      return next(
        new AppError(
          "Datos inválidos",
          "VALIDATION_ERROR",
          400,
          fields
        )
      );
    }

    // Reemplazamos el body por los datos ya saneados
    req.body = result.data;

    next();
  };
};

module.exports = validate;