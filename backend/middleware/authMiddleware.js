// const jwt = require('jsonwebtoken');

// // Middleware to check if token is valid
// exports.authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   // Token format: Bearer token
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) 
//     return res.status(401).json({
//    error: 'Access token required' 
//   });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Invalid or expired token' });

//     req.user = user; // user object from JWT payload
//     next();
//   });
// };

// // Middleware to restrict access based on role
// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ error: 'Forbidden: Insufficient role' });
//     }
//     next();
//   };
// };


const jwt = require('jsonwebtoken');

// Middleware to check if token is valid
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Token format: Bearer token
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) 
    return res.status(401).json({
      error: 'Access token required'
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = user; // user object from JWT payload
    next();
  });
};

// Middleware to restrict access based on role(s)
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

