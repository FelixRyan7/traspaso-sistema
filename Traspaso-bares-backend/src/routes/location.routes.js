const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const locationSchema = require('../schemas/location.schema');


router.get(
  "/",
  authMiddleware, 
  asyncHandler(locationController.getLocations)
);

router.get(
  "/:locationId",
  authMiddleware,
  asyncHandler(locationController.getLocationById)
);

// POST (crear location)
router.post(
  "/", 
  authMiddleware,
  validate(locationSchema),
  asyncHandler(locationController.createLocation)
);

router.put("/:id", authMiddleware, asyncHandler(locationController.updateLocation));

router.patch(
  "/:id/toggle",
  authMiddleware,
  asyncHandler(locationController.toggleLocation)
);

router.get(
  "/:locationId/products",
  authMiddleware,
  asyncHandler(locationController.getLocationProducts)
);

module.exports = router;