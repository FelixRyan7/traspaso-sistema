const { Location, LocationRequest, Product } = require("../models");
const AppError = require("../helpers/AppError");
const { assertCompanyAccess } = require("../helpers/assertCompanyAccess");
const { Op, fn, col } = require("sequelize");

// Find delivered or pending transfers by status and date 
const getLocationRequests = async (locationId, user, filters = {}) => {
  const location = await Location.findOne({
    where: {
      id: locationId,
      companyId: user.companyId,
    },
  });

  if (!location) {
    throw new AppError(
      "LOCATION_NOT_FOUND",
      "Location no encontrado",
      404
    );
  }

  const whereClause = {
    locationId,
  };

  if (filters.status) {
    whereClause.status = filters.status;
  }

  if (filters.date) {
    whereClause.date = filters.date;
  }

  return await LocationRequest.findAll({
    where: whereClause,
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Find delivered transfers by date
const getLocationTransfersByDate = async (
  locationId,
  user,
  filters
) => {

  const {from, to} = filters;

  const location = await Location.findOne({
    where: {
      id: locationId,
      companyId: user.companyId,
    },
  });

  if (!location) {
    throw new AppError(
      "LOCATION_NOT_FOUND",
      "Location no encontrado",
      404
    );
  }

  return await LocationRequest.findAll({
    where: {
      locationId,
      status: "delivered",
      date: {
        [Op.between]: [from, to],
      },
    },

    include: [
      {
        model: Product,
        as: "product",
      },
    ],

    order: [["date", "DESC"]],
  });
};

const getLocationTransfersSummary = async (
  locationId,
  user,
  filters
) => {

  const { from, to } = filters;

  const location = await Location.findOne({
    where: {
      id: locationId,
      companyId: user.companyId,
    },
  });

  if (!location) {
    throw new AppError(
      "LOCATION_NOT_FOUND",
      "Location no encontrado",
      404
    );
  }

  const summary = await LocationRequest.findAll({

    where: {
      locationId,
      status: "delivered",
      date: {
        [Op.between]: [from, to],
      },
    },

    attributes: [
      "productId",
      [fn("SUM", col("LocationRequest.quantity")), "totalQuantity"],
    ],

    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "quantity", "quantityUnit","unitType"],
      },
    ],

    group: [
      "LocationRequest.productId",
      "product.id",
      "product.name",
      "product.quantity",
      "product.quantityUnit",
      "product.unitType",
    ],

    order: [
      [fn("SUM", col("LocationRequest.quantity")), "DESC"],
    ],
    
  });
  return summary.map((item) => ({
  productId: item.productId,
  productName: item.product.name,
  quantity: item.product.quantity,
  quantityUnit: item.product.quantityUnit,
  unitType: item.product.unitType,
  totalQuantity: Number(item.get("totalQuantity")),
}));
  
};

// ADD item (upsert lógico)
const addItem = async (locationId, body, user) => {
  const { productId, quantity } = body;

  let item = await LocationRequest.findOne({
    where: {
      locationId,
      productId,
      status: "pending",
    },
  });

  if (item) {
    item.quantity += quantity;
    item.userId = user.id;
    await item.save();
    return item;
  }

  return await LocationRequest.create({
    locationId,
    productId,
    quantity,
    status: "pending",
    userId: user.id,
    date: new Date().toISOString().split("T")[0],
  });
};


const deliverRequest = async (id, quantity, user) => {
  const request = await LocationRequest.findByPk(id);

  if (!request) {
    throw new AppError("NOT_FOUND", "Request no encontrada", 404);
  }

  const location = await Location.findByPk(request.locationId);
  assertCompanyAccess(user, location);

  const today = new Date().toISOString().split("T")[0];

// Buscar delivered de HOY
let delivered = await LocationRequest.findOne({
  where: {
    locationId: request.locationId,
    productId: request.productId,
    status: "delivered",
    date: today,
  },
});

if (delivered) {
  // Ya hay uno hoy -> acumular
  delivered.quantity += quantity;
  await delivered.save();

  // El pending ya no hace falta
  await request.destroy();

  return delivered;
}

// No hay delivered hoy -> convertir el pending
request.quantity = quantity;
request.status = "delivered";
request.date = today;
request.deliveredAt = new Date();

await request.save();

return request;

};

const createDirectDelivery = async (locationId, body, user) => {
  const { productId, quantity } = body;

  if (!productId) {
    throw new AppError(
      "PRODUCT_REQUIRED",
      "Debe indicar un producto",
      400
    );
  }

  if (!quantity || quantity <= 0) {
    throw new AppError(
      "INVALID_QUANTITY",
      "La cantidad debe ser mayor que cero",
      400
    );
  }

  const location = await Location.findByPk(locationId);

  if (!location) {
    throw new AppError(
      "LOCATION_NOT_FOUND",
      "Ubicación no encontrada",
      404
    );
  }

  assertCompanyAccess(user, location);

  const today = new Date().toISOString().split("T")[0];

  // si existe un deliverd hoy se incrementa posicion
  const delivered = await LocationRequest.findOne({
    where: {
      locationId,
      productId,
      status: "delivered",
      date: today,
    },
  });

  if (delivered) {
    delivered.quantity += quantity;
    delivered.userId = user.id;
    delivered.deliveredAt = new Date();

    await delivered.save();

    return delivered;
  }

  return await LocationRequest.create({
    locationId,
    productId,
    quantity,
    status: "delivered",
    date: today,
    deliveredAt: new Date(),
    userId: user.id,
  });
};


const updateLocationDeliveredRequest = async (id, user, data) => {
  const request = await LocationRequest.findOne({
    where: { id },
    include: [
      {
        model: Location,
        as: "location",
      },
    ],
  });

  if (!request) {
    throw new AppError(
      "REQUEST_NOT_FOUND",
      "Request no encontrada",
      404
    );
  }

  // seguridad: misma company
  if (request.location.companyId !== user.companyId) {
    throw new AppError(
      "FORBIDDEN",
      "No tienes permisos",
      403
    );
  }

  // actualizar solo campos permitidos
  request.quantity = data.quantity;

  await request.save();

  return request;
};


module.exports = {
  getLocationRequests,
  getLocationTransfersByDate,
  getLocationTransfersSummary,
  addItem,
  deliverRequest,
  createDirectDelivery,
  updateLocationDeliveredRequest
};