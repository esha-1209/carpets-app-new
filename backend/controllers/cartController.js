const db = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    console.log('➡️ addToCart called with:', { userId, productId, quantity });

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let cartItem = await db.CartItem.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await db.CartItem.create({
        UserId: userId,
        ProductId: productId,
        quantity,
      });
    }

    res.status(200).json({ message: 'Item added to cart!', cartItem });
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await db.CartItem.findAll({
      where: { UserId: userId },
      include: [{ model: db.Product }],
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cartItem = await db.CartItem.findOne({
      where: {
        id,
        UserId: userId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log('Clearing cart for user:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID missing from token.' });
    }

    await db.CartItem.destroy({
      where: { UserId: userId },
    });

    res.status(200).json({ message: 'Cart cleared successfully!' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cartItem = await db.CartItem.findOne({
      where: {
        id,
        UserId: userId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: 'Cart item updated',
      cartItem,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

