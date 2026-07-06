const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/requireRoles");
const validate = require("../middlewares/validate.middleware");
const productSchema = require("../schemas/product.schema");

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
  validate(productSchema),
  asyncHandler(productController.createProduct)
);

module.exports = router;