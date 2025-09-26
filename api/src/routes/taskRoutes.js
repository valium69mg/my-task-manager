const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const TaskRepository = require('../models/taskRepository.js');
const TaskService = require('../services/taskService.js');
const TaskController = require('../controllers/taskController.js');
const { getPool } = require('../../config/database.js');

const taskRepository = new TaskRepository(getPool());
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.post('/:id', authMiddleware, (req, res) => taskController.createTask(req, res));
router.put('/', authMiddleware, (req, res) => taskController.updateTask(req, res));
router.get('/all', authMiddleware, (req, res) => taskController.getAllTasks(req, res));
router.get('/:id', authMiddleware, (req, res) => taskController.getTaskById(req, res));

module.exports = router;