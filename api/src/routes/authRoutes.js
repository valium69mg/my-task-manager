const express = require('express');
const router = express.Router();

const UserRepository = require('../models/userRepository.js');
const AuthService = require('../services/authService.js');
const AuthController = require('../controllers/authController.js');
const { getPool } = require('../../config/database.js');

const userRepository = new UserRepository(getPool());
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;