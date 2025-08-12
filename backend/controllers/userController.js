const { User } = require('../models');
exports.addShippingAddress = async (req, res) => {
  try {
    const { address, city, postalCode, country } = req.body;
    const user = await User.findByPk(req.user.id);
    user.address = address;
    user.city = city;
    user.postalCode = postalCode;
    user.country = country;
    await user.save();

    res.status(201).json({ message: 'Shipping address added successfully' });
  } catch (error) {
    console.error('Shipping address error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
