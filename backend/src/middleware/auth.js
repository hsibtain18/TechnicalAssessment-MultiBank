const jwt = require('jsonwebtoken');

const SECRET_KEY = '723cb8399a2d3c36a0d4c0878069f8d1998fd5f1134b28626e332918c87b8fae' ||process.env.JWT_SECRET ;
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken, SECRET_KEY };