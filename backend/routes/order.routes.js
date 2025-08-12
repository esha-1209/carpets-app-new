const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/place', authMiddleware, orderController.placeOrder);
router.get('/my-orders', authenticate, orderController.getMyOrders);
router.get('/all', authenticate, orderController.getAllOrders);
router.patch('/mark-paid', verifyToken, orderController.markOrderAsPaid);

module.exports = router;
