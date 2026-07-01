const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware')

router.get(
  "/",
  authMiddleware,
  asyncHandler(dashboardController.getDashboard)
);

module.exports = router;