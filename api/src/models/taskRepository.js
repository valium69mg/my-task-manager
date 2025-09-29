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

    async updateTask(task) {
        let [result] = await this.pool.query(`
            UPDATE tasks SET title = ?, description = ?, status = ?,
                priority = ?, due_date = ? WHERE id = ?
            `, [task.title, task.description, task.status, task.priority, task.dueDate,
                task.id
            ]);
        return querySuccess(result.affectedRows);
    }

    async getAllTasks() {
        const [rows] = await this.pool.query("SELECT * FROM tasks");
        return rows;
    }

    async getTaskById(id) {
        const [rows] = await this.pool.query("SELECT * from tasks WHERE id = ?", [id])
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async deleteTaskById(id) {
        const connection = await this.pool.getConnection();
        let success = false;

        try {
            await connection.beginTransaction();

            await connection.query(
                `DELETE FROM task_users WHERE task_id = ?`,
                [id]
            );

            await connection.query(
                `DELETE FROM tasks WHERE id = ?`,
                [id]
            );

            await connection.commit();
            success = true;
        } catch (error) {
            console.error("Error deleting task:", error);
            await connection.rollback();
        } finally {
            connection.release();
        }

        return success;
    }


}

module.exports = TaskRepository;