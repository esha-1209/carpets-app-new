const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post(
  '/create-user',
  authenticateToken,
  authorizeRoles('admin'), // Only admin role allowed
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      if (!['admin', 'buyer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      return res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
