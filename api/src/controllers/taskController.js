class TaskController {
    constructor(taskService) {
        if (TaskController.instance) {
            return TaskController.instance;
        }
        this.taskService = taskService;
        TaskController.instance = this;
    }

    async createTask(req, res) {
        try {
            const task = req.body;
            const id = req.params.id;

            const response = await this.taskService.createTask(task, id);

            return res.status(response.status).json(response);

         } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async updateTask(req, res) {
        try {
            const task = req.body;

            const response = await this.taskService.updateTask(task);

            return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }
}

module.exports = TaskController;