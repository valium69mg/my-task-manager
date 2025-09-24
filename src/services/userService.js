const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    constructor(userRepository) {
        if (UserService.instance) {
            return UserService.instance;
        }
        this.userRepository = userRepository;
        UserService.instance = this;
    }

    async createUser(user) {
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser != null) { // user exists
            return {status: 400, message: "User already exists"};
        }
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        user.createdAt = new Date();
        let success = await this.userRepository.createUser(user);
        if (success) {
            return {status: 200, message: "User registered succesfully"};;
        }
        return {status: 500, message: "User could not be saved"};
    }

    async updateUser(user) {
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser != null && user.id != existingUser.id) { // user exists and is not the same
            return {status: 400, message: "User already exists"};
        }
        let success = await this.userRepository.updateUser(user);
        if (success) {
            return {status: 200, message: "User updated succesfully"};
        }
        return {status: 500, message: "User could not be updated"};
    }

    async updateUserPassword(id, password) {

        const existingUser = await this.userRepository.getUserById(id);
        if (existingUser === null) { // user does not exists
            return {status: 400, message: "User does not exists"};
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        password = hashedPassword;
        let success = await this.userRepository.updateUserPassword(id, password);
        if (success) {
            return {status: 200, message: "Password updated succesfully"};
        }
        return {status: 500, message: "Password could not be updated"};
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id) {
        return await this.userRepository.getUserById(id);
    }

    async deleteUserById(id) {

        const existingUser = await this.userRepository.getUserById(id);
        if (existingUser === null) { // user does not exists
            return {status: 400, message: "User does not exists"};
        }
        
        let success = await this.userRepository.deleteUserById(id);
        if (success) {
            return {status: 200, message: "User deleted succesfully"};
        }
        return {status: 500, message: "User could not be deleted"};
    }

}

module.exports = UserService;