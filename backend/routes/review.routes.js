// const express = require('express');
// const router = express.Router();
// const reviewController = require('../../controllers/reviewController');
// const verifyToken = require('../../middleware/verifyToken');

// //Only logged-in users can post a review
// router.post('/create', verifyToken, reviewController.createReview);

// //Public route to fetch all reviews for a product
// router.get('/product/:productId', reviewController.getProductReviews);

// module.exports = router;


const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Only logged-in users can post a review
router.post('/create', authenticateToken, reviewController.createReview);
router.get('/product/:productId', reviewController.getProductReviews);
router.put('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
