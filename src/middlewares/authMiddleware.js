const UserRepository = require('../models/userRepository.js'); 
const AuthService = require('../services/authService.js');

const authService = new AuthService(new UserRepository());

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: 'Token not present on the request' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = authService.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded; // Puedes acceder a req.user en rutas protegidas
  next();
}

module.exports = authMiddleware;
