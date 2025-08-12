const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticateToken,authorizeRoles,} = require('../middleware/authMiddleware');

//Public
router.get('/', productController.getAllProducts);
router.get('/modern', productController.getModernProducts);
router.get('/:id', productController.getProductById);

//Admin only
router.post('/',authenticateToken,authorizeRoles('admin'),productController.createProduct);
router.put('/:id',authenticateToken,authorizeRoles('admin'),productController.updateProduct);
router.delete('/:id',authenticateToken,authorizeRoles('admin'),productController.deleteProduct);

module.exports = router;