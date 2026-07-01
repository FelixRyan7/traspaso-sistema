const AppError = require("../helpers/AppError");
const {
  Product,
  Location,
  CompanyProduct,
  sequelize,
  LocationProduct,
} = require("../models");

const getAdminProducts = async (companyId) => {
  // 1. productos del hotel
  const products = await Product.findAll({
    include: [
      {
        model: CompanyProduct,
        where: { companyId },
        attributes: [],
        required: true,
      },
    ],
    order: [["name", "ASC"]],
  });

  // 2. locations del hotel
  const locations = await Location.findAll({
    where: { companyId },
    attributes: ["id", "name", "type", "isActive"],
    order: [["name", "ASC"]],
  });
  return {
    products,
    locations,
  };
};

const createProduct = async (data, companyId) => {
  const {
    locations,
    suggestedQuantity,
    ...productData
  } = data;

  // 1. evitar duplicados dentro del hotel
  const existing = await Product.findOne({
    where: {
      name: productData.name,
      quantity: productData.quantity,
    },
    include: [
      {
        model: CompanyProduct,
        where: { companyId },
        required: true,
      },
    ],
  });

  if (existing) {
    throw new AppError(
      "Ya existe un producto con el mismo nombre y cantidad por unidad",
      "PRODUCT_ALREADY_EXISTS",
      409
    );
  }

  // 2. crear producto global
  const product = await Product.create(productData);

  // 3. relación producto-hotel + suggestedQuantity
  const companyProduct = await CompanyProduct.create({
    companyId,
    productId: product.id,
    suggestedQuantity,
  });

  // 4. relaciones producto-location
  if (locations?.length) {
    await LocationProduct.bulkCreate(
      locations.map((locationId) => ({
        locationId,
        productId: product.id,
        isActive: true,
      }))
    );
  }

  return product;
};

module.exports = {
  getAdminProducts,
  createProduct
};