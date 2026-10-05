const locationService = require("../services/location.service");

const getLocations = async (req, res) => {
  const locations = await locationService.getLocationsByCompany(req.user);

  return res.status(200).json(locations);
};

const getLocationById = async (req, res) => {
  const { locationId } = req.params;
  
  const location = await locationService.getLocationById(
    locationId,
    req.user
  );

  return res.status(200).json(location);
};

const createLocation = async (req, res) => {
  const location = await locationService.createLocation(
    req.body,
    req.user
  );

  return res.status(201).json(location);
};

const updateLocation = async (req, res) => {
  const location = await locationService.updateLocation(
    req.params.id,
    req.body,
    req.user
  );

  return res.json(location);
};

const toggleLocation = async (req, res) => {
  const updated = await locationService.toggleLocation(
    req.params.id,
    req.user
  );

  return res.status(200).json(updated);
};

const getLocationProducts = async (req, res) => {
  const { locationId } = req.params;

  const products = await locationService.getLocationProducts(
    locationId,
    req.user
  );

  return res.status(200).json(products);
};

const getLocationProductsManage = async (req, res) => {
  const { locationId } = req.params;

  const products = await locationService.getLocationProductsManage(
    locationId,
    req.user
  );

  return res.status(200).json(products);
};

const addLocationProduct = async (req, res) => {
  const { locationId, companyProductId } = req.params;

  const locationProduct = await locationService.addLocationProduct(
    locationId,
    companyProductId,
    req.user
  );

  return res.status(201).json(locationProduct);
};

const deleteLocationProduct = async (req, res) => {
  const { locationId, companyProductId } = req.params;

  await locationService.deleteLocationProduct(
    locationId,
    companyProductId,
    req.user
  );

  return res.status(204).send();
};

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  toggleLocation,
  updateLocation,
  getLocationProducts,
  getLocationProductsManage,
  addLocationProduct,
  deleteLocationProduct
};