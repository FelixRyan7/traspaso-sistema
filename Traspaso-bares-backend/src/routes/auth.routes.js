const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const asyncHandler = require('../middlewares/asyncHandler');

// Registro
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/refresh', asyncHandler(authController.refresh));
router.post('/logout', asyncHandler(authController.logout));

module.exports = router;
