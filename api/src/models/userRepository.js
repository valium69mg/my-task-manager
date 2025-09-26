const { getPool } = require('../../config/database');
const {querySuccess} = require('../utils/utils.js')

class UserRepository {
    constructor(pool) {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        this.pool = pool;
        UserRepository.instance = this;
    }

    async createUser(user) {
        const [result] = await this.pool.query(`INSERT INTO users (name, last_name, email, password, created_at)
            VALUES (?, ?, ?, ?, ?)`, [user.name, user.lastName, user.email, user.password, user.createdAt])
        return querySuccess(result.affectedRows);
    }

    async updateUser(user) {
        const [result] = await this.pool.query(
            `UPDATE users SET 
            name = ?, 
            last_name = ?, 
            email = ? 
            WHERE id = ?`,
            [user.name, user.lastName, user.email, user.id]
        );

        return querySuccess(result.affectedRows);
    }

    async updateUserPassword(id, password) {
        const [result] = await this.pool.query(`UPDATE users SET password = ? WHERE id = ?
            `, [password, id]);
        return querySuccess(result.affectedRows);
    }

    async getAllUsers() {
        const [rows] = await this.pool.query("SELECT * FROM users");
        return rows;
    }

    async getUserById(id) {
        const [rows] = await this.pool.query("SELECT * from users WHERE id = ?", [id])
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async getUserByEmail(email) {
        const [rows] = await this.pool.query("SELECT * from users WHERE email = ?", [email])
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    async deleteUserById(id) {      
        const connection = await this.pool.getConnection();
        let success;
        try {
            await connection.beginTransaction();
            let [rows] = await connection.query("SELECT id FROM projects WHERE user_id = ?", [id]);
            let projectIds = rows.map(row => row.id);
            // DELETE PROJECTS OWNED BY USER
            if (projectIds.length !== 0) {
                await connection.query("DELETE FROM project_users WHERE project_id IN (?)",[projectIds]);
                await connection.query("DELETE FROM projects where id IN (?)", [projectIds]);
            }
            // DELETE PROJECTS WHERE USER IS INVOLVED
            await connection.query("DELETE FROM project_users WHERE user_id = ?", [id]);
            // DELETE USER
            await connection.query("DELETE FROM users WHERE id = ?", [id]);
            success = true;
        } catch(error) {     
            await connection.rollback();
            console.error("Error al eliminar proyecto:", error);
            success = false;
        } finally {
            connection.release();
            return success;
        }
    }

}

module.exports = UserRepository;