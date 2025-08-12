const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, wishlistController.addToWishlist);
router.get('/', authenticateToken, wishlistController.getWishlist);
router.delete('/:productId',authenticateToken,wishlistController.removeFromWishlist);

module.exports = router;
