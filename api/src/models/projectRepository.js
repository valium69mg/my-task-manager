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
                INSERT INTO projects (name, description, status, start_date, end_date, user_id)`, 
                [project.name, project.description, project.status, project.startDate, projectEndDate, userId])
        return querySuccess(result.affectedRows);
    }
}

module.exports = ProjectRepository;