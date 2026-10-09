const productService = require("../services/products.service");

const getAdminProducts = async (req, res) => {
  const companyId = req.user.companyId;

  const result = await productService.getAdminProducts(
    companyId
  );

  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const companyId = req.user.companyId;

  const product = await productService.createProduct(
    req.body,
    companyId
  );

  return res.status(201).json({
    success: true,
    data: product,
  });
};

const getCompanyProducts = async (req, res) => {
  const companyId = req.user.companyId;

  const companyProducts =
    await productService.getCompanyProducts(companyId);

  return res.status(200).json(companyProducts);
};

module.exports = {
  getAdminProducts,
  createProduct,
  getCompanyProducts
};