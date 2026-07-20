const express = require("express");
const router = express.Router();

const locationRequestController = require("../controllers/locationRequest.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const authMiddleware = require("../middlewares/auth.middleware");
const requireRoles = require("../middlewares/requireRoles");


router.get(
  "/transfers/summary",
  authMiddleware,
  requireRoles("admin", "manager"),
  asyncHandler(locationRequestController.getLocationTransfersSummary)
);

router.get(
  "/transfers",
  authMiddleware,
  requireRoles("admin", "manager"),
  asyncHandler(locationRequestController.getLocationTransfersByDate)
);

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