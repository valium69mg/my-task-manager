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

    async getAllTasks(req, res) {
        try {

            const tasks = await this.taskService.getAllTasks();

            return res.status(200).json(tasks);
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async getTaskById(req, res) {
        try{ 
            const id = req.params.id;

            let task = await this.taskService.getTaskById(id);
            if (task) {
                return res.status(200).json(task);
            } else {
                return res.status(404).json({status: 404, message: "Task not found"});
            }
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async deleteTaskById(req, res) {
        try {
            const id = req.params.id;
            let response = await this.taskService.deleteTaskById(id);
            return res.status(response.status).json(response);
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }

    async createTaskUsers(req, res) {
        try {
            const data = req.body;
            let response = await this.taskService.createTaskUsers(data.userIds, data.taskId);

            return res.status(response.status).json(response);

        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({status:500, message: 'Internal server error' });
        }
    }



}

module.exports = TaskController;