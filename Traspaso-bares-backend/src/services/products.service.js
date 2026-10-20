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

const getCompanyProducts = async (companyId) => {
  return await CompanyProduct.findAll({
    where: {
      companyId,
    },
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const toggleCompanyProduct = async ( companyProductId, companyId ) => { 
  const companyProduct = 
    await CompanyProduct.findOne({ where: { id: companyProductId, companyId, }, }); 
  
    if (!companyProduct) { 
      throw new AppError
      ( "El producto no pertenece a tu empresa", "COMPANY_PRODUCT_NOT_FOUND", 404 ); 
    } 

    companyProduct.isActive = !companyProduct.isActive; 
    await companyProduct.save(); 
    
  return companyProduct; 
};

const updateCompanyProduct = async (
  companyProductId,
  companyId,
  data
) => {
  const companyProduct = await CompanyProduct.findOne({
    where: {
      id: companyProductId,
      companyId,
    },
  });

  if (!companyProduct) {
    throw new AppError(
      "El producto no pertenece a tu empresa o no existe",
      "COMPANY_PRODUCT_NOT_FOUND",
      404
    );
  }

  const { suggestedQuantity, inventoryUnit, operationalArea } = data;

  const validInventoryUnits = [
    "unit",
    "kg",
    "g",
    "l",
    "ml",
  ];

  const validOperationalAreas = ["bar", "kitchen"];

  // Validar los campos obligatorios
  if (
    suggestedQuantity === undefined ||
    inventoryUnit === undefined ||
    operationalArea === undefined
  ) {
    throw new AppError(
      "Debes proporcionar todos los campos de configuración",
      "INVALID_COMPANY_PRODUCT_DATA",
      400
    );
  }

  // La cantidad sugerida puede ser null o un entero >= 1
  if (
    suggestedQuantity !== null &&
    (!Number.isInteger(suggestedQuantity) || suggestedQuantity < 1)
  ) {
    throw new AppError(
      "La cantidad sugerida debe ser un entero mayor que cero o null",
      "INVALID_SUGGESTED_QUANTITY",
      400
    );
  }

  // La unidad de inventario puede ser null
  if (
    inventoryUnit !== null &&
    !validInventoryUnits.includes(inventoryUnit)
  ) {
    throw new AppError(
      "La unidad de inventario no es válida",
      "INVALID_INVENTORY_UNIT",
      400
    );
  }

  if (!validOperationalAreas.includes(operationalArea)) {
    throw new AppError(
      "El área operativa debe ser bar o kitchen",
      "INVALID_OPERATIONAL_AREA",
      400
    );
  }

  await companyProduct.update({
    suggestedQuantity,
    inventoryUnit,
    operationalArea,
  });

  return companyProduct;
};

module.exports = {
  getAdminProducts,
  createProduct,
  getCompanyProducts,
  toggleCompanyProduct,
  updateCompanyProduct
};