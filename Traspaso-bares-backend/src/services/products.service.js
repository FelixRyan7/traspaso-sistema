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
        as: "companyProducts",
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

  // Evitar duplicados dentro del hotel
  const existing = await Product.findOne({
    where: {
      name: productData.name,
      quantity: productData.quantity,
    },
    include: [
      {
        model: CompanyProduct,
        as: "companyProducts",
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

  return await sequelize.transaction(async (transaction) => {
    // 1. Crear producto global
    const product = await Product.create(productData, {
      transaction,
    });

    // 2. Crear relación empresa-producto
    const companyProduct = await CompanyProduct.create(
      {
        companyId,
        productId: product.id,
        suggestedQuantity,
      },
      {
        transaction,
      }
    );

    // 3. Crear relaciones location-product
    if (locations?.length) {
      await LocationProduct.bulkCreate(
        locations.map((locationId) => ({
          locationId,
          companyProductId: companyProduct.id,
          isActive: true,
        })),
        {
          transaction,
        }
      );
    }

    return product;
  });
};

module.exports = {
  getAdminProducts,
  createProduct
};