class TaskService {
    constructor(taskRepository) {
        if (TaskService.instance) {
            return TaskService.instance;
        }
        this.taskRepository = taskRepository;
        TaskService.instance = this;
    }

    async createTask(task, userId) {
        let success = await this.taskRepository.createTask(task, userId);
        if (success){
            return {status: 201, message: "Task created successfully"}
        }
        return {status: 500, message: "Task could not be created"}
    }

    async updateTask(task) {
        let success = await this.taskRepository.updateTask(task);
        if (success) {
            return {status: 201, message: "Task updated succesfully"}
        }
        return {status: 500, message: "Task could not be updated"}
    }

    async getAllTasks() {
        return await this.taskRepository.getAllTasks();
    }

    async getTaskById(id) {
        const task = await this.taskRepository.getTaskById(id);
        return task;
    }

}

module.exports = TaskService;