//to test authorisation:
const express = require('express');
const router = express.Router();
const {
  authenticateToken,
  authorizeRoles,
} = require('../middleware/authMiddleware');

router.get(
  '/buyer-only',
  authenticateToken,
  authorizeRoles('buyer'),
  (req, res) => {
    res.json({ message: `Hello Buyer ${req.user.email}` });
  }
);
router.get(
  '/admin-only',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: `Hello Admin ${req.user.email}` });
  }
);

module.exports = router;


