

const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  const data = await dashboardService.getDashboard(req.user);

  return res.status(200).json(data);
};

module.exports = {
  getDashboard,
};