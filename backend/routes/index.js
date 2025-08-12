const express = require('express');
const router = express.Router();

const authRoutes = require('../auth.routes');
const cartRoutes = require('../cart.routes');
const orderRoutes = require('../order.routes');
const productRoutes = require('../product.routes');
const protectedRoutes = require('../protected.routes');
const reviewRoutes = require('../review.routes');
const wishlistRoutes = require('../wishlist.routes');
const stripeRoutes = require('../stripe.routes');
const userRoutes =require('../user.routes');

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/protected', protectedRoutes);
router.use('/review', reviewRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/stripe', stripeRoutes);
router.use('/user', userRoutes);

module.exports = router;
