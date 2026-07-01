const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/requireRoles")

router.get(
  "/",
  authMiddleware,
  requireRoles('admin', 'manager'),
  asyncHandler(productController.getAdminProducts)
);

router.post(
  "/",
  authMiddleware,
  requireRoles("admin", "manager"),
  asyncHandler(productController.createProduct)
);

module.exports = router;