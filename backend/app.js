require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const protectedRoutes = require('./routes/protected.routes');
app.use('/api/protected', protectedRoutes);

const Product = require('./models/product.model');
sequelize
  .sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Sync error:', err));
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart', cartRoutes);

const stripeRoutes = require('./routes/stripe.routes');
app.use('/api/stripe', stripeRoutes);

const reviewRoutes = require('./routes/review.routes');
app.use('/api/reviews', reviewRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Carpets Store API is running');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    app.listen(PORT, () =>
      console.log(`Server running on  http://localhost:${PORT} `)
    );
  })
  .catch((err) => {
    console.error('❌ DB Connection failed:', err);
  });

//same
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const { sequelize } = require('./models'); // models/index.js will work with require

// const authRoutes = require('./routes/auth.routes');
// const protectedRoutes = require('./routes/protected.routes');
// const productRoutes = require('./routes/product.routes');
// const cartRoutes = require('./routes/cart.routes');
// const userRoutes = require('./routes/user.routes');

// const Product = require('./models/product.model'); // if you need Product

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/api/protected', protectedRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Carpets Store API is running');
// });

// sequelize
//   .sync({ alter: true })
//   .then(() => console.log('Database synced'))
//   .catch((err) => console.error('Sync error:', err));

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('✅ Database connected...');
//     app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error('❌ DB Connection failed:', err);
//   });
