const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const ProjectRepository = require('../models/projectRepository.js');
const ProjectService = require('../services/projectService.js');
const ProjectController = require('../controllers/projectController.js');
const { getPool } = require('../../config/database.js');

const projectRepository = new ProjectRepository(getPool());
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

router.post('/user', authMiddleware, (req, res) => projectController.createProjectUsers(req, res));
router.delete('/user', authMiddleware, (req, res) => projectController.deleteProjectUsers(req, res));
router.get('/user/:id', authMiddleware, (req, res) => projectController.getUserIdsByProjectId(req, res));
router.post('/:id', authMiddleware, (req, res) => projectController.createProject(req, res));
router.put('/', authMiddleware, (req, res) => projectController.updateProject(req, res));
router.get('/all', authMiddleware, (req, res) => projectController.getAllProjects(req, res));
router.get('/:id', authMiddleware, (req, res) => projectController.getProjectById(req, res));
router.delete('/:id', authMiddleware, (req, res) => projectController.deleteProjectById(req, res));

module.exports = router;