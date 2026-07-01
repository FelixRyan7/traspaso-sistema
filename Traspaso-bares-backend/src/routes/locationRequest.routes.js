const express = require("express");
const router = express.Router();

const locationRequestController = require("../controllers/locationRequest.controller");

const asyncHandler = require("../middlewares/asyncHandler");
const authMiddleware = require("../middlewares/auth.middleware");
const requireRoles = require("../middlewares/requireRoles");



// obtener lista del día
router.get(
  "/:locationId",
  authMiddleware,
  requireRoles('admin', 'manager', 'staff'),
  asyncHandler(locationRequestController.getLocationRequests)
);

// añadir movimiento
router.post(
  "/:locationId/items",
  authMiddleware,
  requireRoles('admin', 'manager', 'staff'),
  asyncHandler(locationRequestController.addItem)
);

router.post(
  "/:locationId/deliveries",
  authMiddleware,
  requireRoles('admin', 'manager', 'staff'),
  asyncHandler(locationRequestController.createDirectDelivery)
);

router.patch(
  "/:id/deliver",
  authMiddleware,
  requireRoles('admin', 'manager', 'staff'),
  asyncHandler(locationRequestController.deliverRequest)
)

router.patch(
  "/:id",
  authMiddleware,
  requireRoles('admin', 'manager', 'staff'),
  asyncHandler(locationRequestController.updateLocationDeliveredRequest)
);

module.exports = router;