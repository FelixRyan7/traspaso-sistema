const sequelize = require('../config/database');

const User = require('./User');
const Session = require('./Session');
const Company = require('./Company');
const LocationProduct = require('./LocationProduct')
const Product = require('./Product');
const CompanyProduct = require('./CompanyProduct');
const Location = require('./Location');
const LocationRequest = require("./LocationRequest");


// ===============================
// RELACIÓN USER - COMPANY
// ===============================
// Un usuario pertenece a una empresa (multi-tenant)
Company.hasMany(User, {
  foreignKey: 'companyId',
});

User.belongsTo(Company, {
  foreignKey: 'companyId',
});


// ===============================
// RELACIÓN COMPANY - PRODUCT
// ===============================
// Catálogo de productos disponibles para cada empresa.
// Esta es una relación many-to-many simple (NO tiene lógica de negocio compleja).
// CompanyProduct aquí actúa como tabla puente con datos adicionales (ej: sugerencias, stock bajo).
Company.belongsToMany(Product, {
  through: CompanyProduct,
  foreignKey: 'companyId',
  otherKey: 'productId',
});

Product.belongsToMany(Company, {
  through: CompanyProduct,
  foreignKey: 'productId',
  otherKey: 'companyId',
});

Company.hasMany(CompanyProduct, {
  foreignKey: 'companyId',
});

Product.hasMany(CompanyProduct, {
  foreignKey: 'productId',
});

CompanyProduct.belongsTo(Company, {
  foreignKey: 'companyId',
});

CompanyProduct.belongsTo(Product, {
  foreignKey: 'productId',
});


// ===============================
// RELACIÓN PRODUCT - LOCATIONPRODUCT
// ===============================
// Esta es una entidad de negocio (NO solo una tabla intermedia).
// Define qué productos están disponibles en cada punto de venta (location)
// y puede incluir lógica como precios override o configuración local.
//
// IMPORTANTE:
// Aquí NO dependemos de belongsToMany porque LocationProduct tiene significado propio.
LocationProduct.belongsTo(Product, {
  foreignKey: "productId",
});

LocationProduct.belongsTo(Location, {
  foreignKey: "locationId",
});

Product.hasMany(LocationProduct, {
  foreignKey: "productId",
});

Location.hasMany(LocationProduct, {
  foreignKey: "locationId",
});


// ===============================
// RELACIÓN COMPANY - LOCATION
// ===============================
// Una empresa tiene varios puntos de venta (bares, cocinas, etc.)
Company.hasMany(Location, {
  foreignKey: 'companyId',
});

Location.belongsTo(Company, {
  foreignKey: 'companyId',
});


// ===============================
// RELACIÓN USER - LOCATION ORDER ITEMS
// ===============================
// Registra qué usuario ha ejecutado un movimiento físico (delivery/request/etc).
User.hasMany(LocationRequest, {
  foreignKey: "userId",
});

LocationRequest.belongsTo(User, {
  foreignKey: "userId",
  as: "handledBy",
});


// ===============================
// RELACIÓN PRODUCT - COMPANY PRODUCT
// ===============================
// Configuración de productos a nivel empresa (catálogo interno).
// Incluye datos como sugerencias o flags de stock.
Product.hasMany(CompanyProduct, {
  foreignKey: "productId",
  as: "companyProducts",
});

CompanyProduct.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});


// ===============================
// RELACIÓN PRODUCT - LOCATION ORDER ITEMS
// ===============================
// Cada movimiento (item) siempre está asociado a un producto concreto.
Product.hasMany(LocationRequest, {
  foreignKey: "productId",
});

LocationRequest.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Location.hasMany(LocationRequest, {
  foreignKey: "locationId",
  as: "items",
});

LocationRequest.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location",
});

module.exports = {
  sequelize,
  User,
  Session,
  Company,
  Product,
  CompanyProduct,
  Location,
  LocationProduct,
  LocationRequest
  
};

