const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/place', authMiddleware, orderController.placeOrder);
router.get('/my-orders', authenticate, orderController.getMyOrders);
router.get('/all', authenticate, orderController.getAllOrders);
router.patch('/mark-paid', authMiddleware, orderController.markOrderAsPaid);
router.patch('/:id/cancel', authMiddleware, orderController.cancelOrder); // Buyer
router.patch('/:id/status', authMiddleware, orderController.updateOrderStatus); // Admin

module.exports = router;
