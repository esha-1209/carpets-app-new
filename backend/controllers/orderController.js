const { CartItem, Order, OrderItem, Product, User } = require('../models');

// PLACE ORDER (from cart)
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get user's cart items
    const cartItems = await CartItem.findAll({
      where: { UserId: userId },
      include: [Product], // to access product price
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.quantity * item.Product.price;
    }, 0);

    // 3. Create order
    const order = await Order.create({
      UserId: userId,
      totalPrice,
      paymentMethod: 'cash', // or default if not passed
      paymentStatus: 'unpaid',
      status: 'pending',
    });

    // 4. Create order items
    const orderItemsData = cartItems.map((item) => ({
      OrderId: order.id,
      ProductId: item.ProductId,
      quantity: item.quantity,
      price: item.Product.price,
    }));
    await OrderItem.bulkCreate(orderItemsData);

    // 5. Clear cart
    await CartItem.destroy({ where: { UserId: userId } });

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: order.id,
      totalPrice,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PLACE ORDER (directly from frontend, with cartItems in req.body)
exports.createOrder = async (req, res) => {
  try {
    const { paymentMethod, cartItems, totalPrice } = req.body;
    const userId = req.user.id;

    const order = await Order.create({
      UserId: userId,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'unpaid' : 'paid',
      status: 'pending',
    });

    const orderItems = cartItems.map((item) => ({
      OrderId: order.id,
      ProductId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Order failed' });
  }
};

// MARK AS PAID
exports.markOrderAsPaid = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.paymentStatus = 'paid';
    order.paymentIntentId = paymentIntentId;
    await order.save();

    res.status(200).json({ message: 'Order marked as paid' });
  } catch (error) {
    console.error('Error marking order as paid:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// GET USER'S ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET ALL ORDERS (ADMIN ONLY)
exports.getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Admin access only.' });
    }

    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Internal server error' });}

  // CANCEL ORDER (Buyer)
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params; // order ID from URL
    const userId = req.user.id;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    // Check if user owns the order
    if (order.UserId !== userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this order' });
    }
    // Only pending orders can be cancelled
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order cannot be cancelled' });
    }
    order.status = 'cancelled';
    await order.save();
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// UPDATE ORDER STATUS (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // order ID
    const { status } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access only' });
    }

    // Only allow specific statuses
    const allowedStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: `Order status updated to ${status}` });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  }