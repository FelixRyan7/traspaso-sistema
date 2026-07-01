const AppError = require("./AppError");

const assertCompanyAccess = (user, location) => {
  if (location.companyId !== user.companyId) {
    throw new AppError("FORBIDDEN", "No autorizado", 403);
  }
};

module.exports = {
  assertCompanyAccess,
};