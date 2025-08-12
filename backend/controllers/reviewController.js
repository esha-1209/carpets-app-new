// const { Review, Product, User } = require('../models');

// // ➕ Create a Review
// exports.createReview = async (req, res) => {
//   try {
//     const { rating, comment, productId } = req.body;

//     // Ensure product exists
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     const review = await Review.create({
//       rating,
//       comment,
//       ProductId: productId,
//       UserId: req.user.id, // Assuming user is authenticated
//     });

//     res.status(201).json(review);
//   } catch (error) {
//     console.error('Error creating review:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // 📦 Get all reviews for a product
// exports.getProductReviews = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const reviews = await Review.findAll({
//       where: { ProductId: productId },
//       include: {
//         model: User,
//         attributes: ['id', 'name', 'email'],
//       },
//       order: [['createdAt', 'DESC']],
//     });

//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error('Error fetching product reviews:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


const { Review, Product, User } = require('../models');

// ➕ Create a Review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Ensure product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user has already reviewed the product
    const existingReview = await Review.findOne({
      where: { ProductId: productId, UserId: req.user.id }
    });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      rating,
      comment,
      ProductId: productId,
      UserId: req.user.id, // Authenticated user ID
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 📦 Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { ProductId: req.params.productId },
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('❌ Error fetching product reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// controllers/reviewController.js

// Update review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.UserId !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }
      review.rating = rating;
    }

    if (comment) review.comment = comment;

    await review.save();

    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.UserId !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    await review.destroy();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
