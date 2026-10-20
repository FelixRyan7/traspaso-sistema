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

const toggleCompanyProduct = async (req, res) => { 
  const companyId = req.user.companyId; 
  const { companyProductId } = req.params; 

  const companyProduct = 
    await productService.toggleCompanyProduct( companyProductId, companyId ); 

  return res.status(200).json({ success: true, data: companyProduct, }); 
};

const updateCompanyProduct = async (req, res) => {
  const companyId = req.user.companyId;
  const { companyProductId } = req.params;

  const companyProduct =
    await productService.updateCompanyProduct(
      companyProductId,
      companyId,
      req.body
    );

  return res.status(200).json({
    success: true,
    data: companyProduct,
  });
};

module.exports = {
  getAdminProducts,
  createProduct,
  getCompanyProducts,
  toggleCompanyProduct,
  updateCompanyProduct
};