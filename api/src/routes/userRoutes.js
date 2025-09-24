const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const UserRepository = require('../models/userRepository.js');
const UserService = require('../services/userService.js');
const UserController = require('../controllers/userController.js');
const { getPool } = require('../../config/database.js');

const userRepository = new UserRepository(getPool());
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/', authMiddleware, (req, res) => userController.register(req, res));
router.put('/', authMiddleware, (req, res) => userController.update(req, res));
router.put('/password/:id', authMiddleware, (req, res) => userController.updateUserPassword(req, res));
router.get('/all', authMiddleware, (req, res) => userController.getAllUsers(req, res));
router.get('/:id', authMiddleware, (req, res) => userController.getUserById(req, res));
router.delete('/:id', authMiddleware, (req, res) => userController.deleteUserById(req, res));

module.exports = router;
