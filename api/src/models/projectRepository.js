const { getPool } = require('../../config/database');
const {querySuccess} = require('../utils/utils.js')

class ProjectRepository {
    constructor(pool) {
        if (ProjectRepository.instance){
            return ProjectRepository.instance;
        }
        this.pool = pool;
        ProjectRepository.instance = this;
    }

    async createProject(project, userId) {
        const [result] = await this.pool.query(`
            INSERT INTO projects (name, description, status, start_date, end_date, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [project.name, project.description, project.status, project.startDate, project.endDate, userId]);
        return querySuccess(result.affectedRows);
    }

    async updateProject(project) {
        const [result] = await this.pool.query(`
            UPDATE projects SET name = ?, description = ?, status = ?, start_date = ?,
                end_date = ? WHERE id = ?
            `, [project.name, project.description, project.status, project.startDate, 
                project.endDate, project.id
            ]);
        return querySuccess(result.affectedRows);
    }

    async getAllProjects() {
        const [rows] = await this.pool.query(`
            SELECT * FROM projects
            `)
        return rows;
    }

    async getProjectById(id) {
        const [rows] = await this.pool.query(`
            SELECT * FROM projects WHERE id = ?
            `, [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async deleteProjectById(id) {
        const connection = await this.pool.getConnection();
        let success;
        try {
            await connection.beginTransaction();

            await connection.query(`DELETE FROM project_users WHERE project_id = ?`, [id]);
            await connection.query(`DELETE FROM projects WHERE id = ?`, [id]);

            await connection.commit();
            success = true;
        } catch (error) {
            await connection.rollback();
            console.error("Error al eliminar proyecto:", error);
            success = false;
        } finally {
            connection.release();
            return success;
        }
    }

    async createProjectUsers(userIds, projectId) {
        const [userRows] = await this.pool.query(`
            SELECT user_id FROM project_users WHERE project_id = ?
        `, [projectId]);
        console.log(userRows);
        let existingUsers = [];
        if (userRows.length !== 0) {
            existingUsers = userRows.map(ur => ur.user_id);
        }
        console.log(existingUsers);
        const values = userIds
            .filter(id => !existingUsers.includes(id))
            .map(id => [projectId, id]);
        console.log(values);
        if (values.length === 0) {
            return true;
        }
        const [result] = await this.pool.query(`
            INSERT INTO project_users (project_id, user_id)
            VALUES ?
        `, [values]);
        console.log(result);
        return querySuccess(result.affectedRows);
    }


    async deleteProjectUsers(userIds, projectId) {
         await this.pool.query(`
            DELETE FROM project_users
            WHERE project_id = ? AND user_id IN (?) 
        `, [projectId, userIds]);
        return true;
    }

    async getUserIdsByProjectId(projectId) {
        const [rows] = await this.pool.query("SELECT user_id FROM project_users WHERE project_id = ?",
            [projectId]
        );
        return rows.map(r => r.user_id);
    }

}

module.exports = ProjectRepository;