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

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  toggleLocation,
  getLocationProducts
};