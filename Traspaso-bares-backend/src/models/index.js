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
// COMPANY
// ===============================

// COMPANY -> USER
Company.hasMany(User, {
  foreignKey: 'companyId',
});

// COMPANY -> LOCATION
Company.hasMany(Location, {
  foreignKey: 'companyId',
});

// COMPANY -> PRODUCT (many-to-many)
Company.belongsToMany(Product, {
  through: CompanyProduct,
  foreignKey: 'companyId',
  otherKey: 'productId',
});

// COMPANY -> COMPANY PRODUCT
Company.hasMany(CompanyProduct, {
  foreignKey: 'companyId',
});


// ===============================
// PRODUCT
// ===============================

// PRODUCT -> COMPANY
Product.belongsToMany(Company, {
  through: CompanyProduct,
  foreignKey: 'productId',
  otherKey: 'companyId',
});

//PRODUCT -> COMPANY PRODUCT
Product.hasMany(CompanyProduct, {
  foreignKey: "productId",
  as: "companyProducts",
});


// PRODUCT -> LOCATION REQUEST
Product.hasMany(LocationRequest, {
  foreignKey: "productId",
});


// ===============================
// LOCATION
// ===============================

// LOCATION -> LOCATION REQUEST
Location.hasMany(LocationProduct, {
  foreignKey: "locationId",
});

// LOCATION -> COMPANY
Location.belongsTo(Company, {
  foreignKey: 'companyId',
});
 
// LOCATOIN -> LOCATION REQUEST
Location.hasMany(LocationRequest, {
  foreignKey: "locationId",
  as: "items",
});


// ===============================
// USER
// ===============================

// USER -> COMPANY
User.belongsTo(Company, {
  foreignKey: 'companyId',
});

// USER -> SESSION
User.hasMany(Session, {
  foreignKey: "userId",
});

// USER -> LOCATION REQUEST
User.hasMany(LocationRequest, {
  foreignKey: "userId",
});


// ===============================
// COMPANY PRODUCT
// ===============================

// COMPANY PRODUCT -> COMPANY
CompanyProduct.belongsTo(Company, {
  foreignKey: 'companyId',
});

// COMPANY PRODUCT -> LOCATION PRODUCT
CompanyProduct.hasMany(LocationProduct, {
  foreignKey: "companyProductId",
  as: "locationProducts",
});

// COMPANY PRODUCT -> PRODUCT
CompanyProduct.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});


// ===============================
// LOCATION REQUEST
// ===============================

// LOCATION REQUEST -> USER
LocationRequest.belongsTo(User, {
  foreignKey: "userId",
  as: "handledBy",
});

// LOCATION REQUEST -> PRODUCT
LocationRequest.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// LOCATION REQUEST -> LOCATION
LocationRequest.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location",
});


// ===============================
// LOCATION PRODUCT
// ===============================

// LOCATION PRODUCT -> COMPANY PRODUCT
LocationProduct.belongsTo(CompanyProduct, {
  foreignKey: "companyProductId",
  as: "companyProduct",
});
 
// LOCATION PRODUCT -> LOCATION
LocationProduct.belongsTo(Location, {
  foreignKey: "locationId",
});


// ===============================
// SESSION
// ===============================

// SESSION -> USER
Session.belongsTo(User, {
  foreignKey: "userId",
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

