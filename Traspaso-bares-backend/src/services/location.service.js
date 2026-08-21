const { Location, LocationProduct, Product, CompanyProduct } = require("../models");
const AppError = require("../helpers/AppError");


const getLocationsByCompany = async (authUser) => {
  if (!authUser?.companyId) {
    throw new AppError("Company not found", "NO_COMPANY", 400);
  }

  const locations = await Location.findAll({
    where: {
      companyId: authUser.companyId,
    },
    order: [["createdAt", "DESC"]],
  });

  return locations;
};

const getLocationById = async (locationId, authUser) => {
  const location = await Location.findByPk(locationId);

  if (!location) {
    throw new AppError("Location not found", "LOCATION_NOT_FOUND", 404);
  }

  // seguridad: pertenece al mismo company del user
  if (location.companyId !== authUser.companyId) {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  return {
    id: location.id,
    name: location.name,
    type: location.type,
    isActive: location.isActive,
    companyId: location.companyId,
  };
};

const createLocation = async (data, authUser) => {
  if (!authUser?.companyId) {
    throw new AppError("Company not found", "NO_COMPANY", 400);
  }

  const { name, type } = data;

   const existing = await Location.findOne({
    where: {
      name,
      companyId: authUser.companyId,
    },
  });

  if (existing) {
    throw new AppError(
      "Ya existe un POS con este nombre",
      "DUPLICATED_LOCATION",
      409
    );
  }

  const location = await Location.create({
    name,
    type: type || "bar",
    companyId: authUser.companyId,
    isActive: true,
  });

  return location;
};

const updateLocation = async (id, data, authUser) => {
  if (!authUser?.companyId) {
    throw new AppError("Company not found", "NO_COMPANY", 400);
  }

  const location = await Location.findOne({
    where: {
      id,
      companyId: authUser.companyId,
    },
  });

  if (!location) {
    throw new AppError("POS no encontrado", "LOCATION_NOT_FOUND", 404);
  }

  const { name, type } = data;

  const existing = await Location.findOne({
    where: {
      name,
      companyId: authUser.companyId,
    },
  });

  if (existing && existing.id !== location.id) {
    throw new AppError(
      "Ya existe un POS con este nombre",
      "DUPLICATED_LOCATION",
      409
    );
  }

  await location.update({
    name,
    type,
  });

  return location;
};

const toggleLocation = async (locationId, authUser) => {
  const location = await Location.findOne({
    where: {
      id: locationId,
      companyId: authUser.companyId,
    },
  });

  if (!location) {
    throw new AppError("Location not found", "NOT_FOUND", 404);
  }

  location.isActive = !location.isActive;
  await location.save();

  return location;
};

const getLocationProducts = async (locationId, user) => {
  const locationProducts = await LocationProduct.findAll({
    where: { locationId },
    include: [
      {
        model: CompanyProduct,
        as: "companyProduct",
        required: true,
        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "name",
              "brand",
              "category",
              "subcategory",
              "unitType",
              "quantity",
              "quantityUnit",
            ],
          },
        ],
      },
    ],
  });

  return locationProducts.map((lp) => ({
    productId: lp.companyProduct.product.id,

    name: lp.companyProduct.product.name,
    brand: lp.companyProduct.product.brand,
    category: lp.companyProduct.product.category,
    subcategory: lp.companyProduct.product.subcategory,
    unitType: lp.companyProduct.product.unitType,
    quantity: lp.companyProduct.product.quantity,
    quantityUnit: lp.companyProduct.product.quantityUnit,

    locationProduct: {
      id: lp.id,
      priceOverride: lp.priceOverride,
    },

    companyProduct: {
      id: lp.companyProduct.id,
      suggestedQuantity: lp.companyProduct.suggestedQuantity,
      inventoryUnit: lp.companyProduct.inventoryUnit,
      operationalArea: lp.companyProduct.operationalArea,
      isActive: lp.companyProduct.isActive,
      isStockLow: lp.companyProduct.isStockLow,
    },
  }));
};

module.exports = {
  getLocationsByCompany,
  getLocationById,
  createLocation,
  updateLocation,
  toggleLocation,
  getLocationProducts
};