const locationRequestService = require("../services/locationRequest.service");


const getLocationRequests = async (req, res) => {
  const { locationId } = req.params;
  const { status, date } = req.query;

  const items = await locationRequestService.getLocationRequests(
    Number(locationId),
    req.user,
    {
      status,
      date,
    }
  );

  res.json(items);
};

// Find trasnfers by date and location
const getLocationTransfersByDate = async (req, res) => {
  const { locationId, from, to } = req.query;
   

  const transfers =
    await locationRequestService.getLocationTransfersByDate(
      Number(locationId),
      req.user,
      {
        from,
        to,
      }
    );

  res.json(transfers);
};

// Find total quantity per product by date
const getLocationTransfersSummary = async (req, res) => {
  
  const { locationId, from, to } = req.query;

  const summary =
    await locationRequestService.getLocationTransfersSummary(
      Number(locationId),
      req.user,
      {
        from,
        to,
      }
    );

  res.json(summary);
};

const addItem = async (req, res) => {
  try {
    const { locationId } = req.params;

    const item = await locationRequestService.addItem(
      Number(locationId),
      req.body,
      req.user
    );

    return res.status(201).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding item" });
  }
};


const deliverRequest = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updated = await locationRequestService.deliverRequest(
    Number(id),
    quantity,
    req.user
  );

  res.json(updated);
};

const createDelivery = async (req, res) => {
  const delivery = await locationRequestService.createDelivery(
    Number(req.params.locationId),
    req.body,
    req.user
  );

  res.status(201).json(delivery);
};

const updateLocationDeliveredRequest = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updated = await locationRequestService.updateLocationDeliveredRequest(
    Number(id),
    req.user,
    { quantity }
  );

  res.json(updated);
};


module.exports = {
  getLocationRequests,
  getLocationTransfersByDate,
  getLocationTransfersSummary,
  addItem,
  deliverRequest,
  createDelivery,
  updateLocationDeliveredRequest
};