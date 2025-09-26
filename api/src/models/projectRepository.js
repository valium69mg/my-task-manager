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
                end_date = ?, user_id = ? WHERE id = ?
            `, [project.name, project.description, project.status, project.startDate, 
                project.endDate, project.userId, project.id
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
        const [result] = await this.pool.query(`
            DELETE FROM projects WHERE id = ?
            `, [id]);
        return querySuccess(result.affectedRows);
    }

}

module.exports = ProjectRepository;