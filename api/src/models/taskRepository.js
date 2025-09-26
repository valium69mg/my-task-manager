const {querySuccess} = require('../utils/utils.js')

class TaskRepository {
    constructor(pool) {
        if (TaskRepository.instance) {
            return TaskRepository.instance;
        }
        this.pool = pool;
        TaskRepository.instance = this;
    }

    async createTask(task, userId) {
        let [result] = await this.pool.query(`
            INSERT INTO tasks (title, description, status, priority, due_date, 
            project_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [task.title, task.description, task.status, task.priority, 
                task.dueDate, task.projectId, userId
            ]);
        return querySuccess(result.affectedRows);

    }

}

module.exports = TaskRepository;