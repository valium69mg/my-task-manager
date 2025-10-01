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

    async deleteTaskById(id) {
        let success = await this.taskRepository.deleteTaskById(id);
        if (success) {
            return {status: 201, message: "Task delete succesfully"}
        }
        return {status: 500, message: "Task could not be deleted"}
    }

    async createTaskUsers(userIds, taskId) {
        let success = await this.taskRepository.createTaskUsers(userIds, taskId);
        if (success) {
            return {status: 201, message: "Task users created successfully"}
        } else {
            return {status: 500, message: "Task users could not be created"}
        }
    }

    async deleteTaskUsers(userIds, taskId) {
        let success = await this.taskRepository.deleteTaskUsers(userIds, taskId);
        if (success) {
            return {status: 200, message: "Task users deleted successfully"}
        }
        return {status: 500, message: "Task users could not be created"}

    }

    async getUserIdsByTaskId(taskId) {
        return await this.taskRepository.getUserIdsByTaskId(taskId);
    }
}

module.exports = TaskService;