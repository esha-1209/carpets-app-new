const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

console.log(
  'typeof authenticateToken:',
  typeof authMiddleware.authenticateToken
);
console.log('typeof addToCart:', typeof cartController.addToCart);

router.post('/add', authMiddleware.authenticateToken, cartController.addToCart);
router.get('/', authMiddleware.authenticateToken, cartController.getCart);
router.delete('/clear', authMiddleware.authenticateToken,cartController.clearCart);
router.delete('/:id',authMiddleware.authenticateToken,cartController.deleteCartItem);
router.put('/:id', authMiddleware.authenticateToken,cartController.updateCartItem);

module.exports = router;



