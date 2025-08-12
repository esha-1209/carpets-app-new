const { Product } = require('../models');

//Admin only
exports.createProduct = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // ✅ Add this
    const { name, description, size, color, price, imageUrl, style } = req.body;

    const product = await Product.create({
      name,
      description,
      size,
      color,
      price,
      imageUrl,
      style,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err); // ✅ Better logging
    res.status(500).json({ error: 'Internal server error' });
  }
};
//Public
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
//Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
// Public
exports.getModernProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { style: 'Modern Contemporary' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch modern products' });
  }
};
//Admin only
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ name, description, price, imageUrl });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};
//Admin only
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
