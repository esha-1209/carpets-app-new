require('dotenv').config();
const db = require('./models');

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected successfully!');

    await db.sequelize.sync({ force: true });
    console.log('✅ Models synced successfully!');

    // Create a test user
    const user = await db.User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret123',
    });

    // Create a test product with required fields
    const product = await db.Product.create({
      name: 'Test Carpet',
      description: 'Luxury handmade carpet',
      size: '5x8',
      color: 'Blue',
      price: 12000,
      stock: 10,
      imageUrl: 'https://example.com/test-carpet.jpg',
    });

    // Add product to cart
    const cartItem = await db.CartItem.create({
      UserId: user.id,
      ProductId: product.id,
      quantity: 2,
    });

    console.log('\n Cart Item created:', cartItem.toJSON());
    console.log('\n Test data created successfully!');
  } catch (error) {
    console.error('Error testing DB or syncing models:', error);
  } finally {
    await db.sequelize.close();
  }
}

testConnection();
