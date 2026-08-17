const { User, Company, Location } = require("../models");
const AppError = require("../helpers/AppError");

const getDashboard = async (authUser) => {
  // 1. obtener usuario real desde BD
  const user = await User.findByPk(authUser.id);

  if (!user) {
    throw new AppError("User not found", "USER_NOT_FOUND", 404);
  }

  // 2. obtener company (hotel)
  const company = await Company.findByPk(user.companyId);

  if (!company) {
    throw new AppError("Company not found", "COMPANY_NOT_FOUND", 404);
  }

  // 3. obtener locations del hotel
  const locations = await Location.findAll({
    where: {
      companyId: company.id,
    },
  });

  // 4. response limpio para frontend
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      operationalArea: user.operationalArea
    },

    company: {
      id: company.id,
      name: company.name,
    },

    locations: locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      type:loc.type,
      isActive: loc.isActive,
    })),
  };
};

module.exports = {
  getDashboard,
};