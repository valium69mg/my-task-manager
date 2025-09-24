const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {

    constructor(userRepository) {
        if (AuthService.instance) {
            return AuthService.instance;
        }
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN;
        AuthService.instance = this;
    }

    
    async login(email, password) {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
        return { status: 400, message: 'Invalid credentials' };
        }

        const token = jwt.sign({ id: user.id, username: user.email }, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
        });

        return {status: 200, message: "Login succesfull!", token: token};
    }

    verifyToken(token) {
        try {
        return jwt.verify(token, this.jwtSecret);
        } catch (err) {
            return false;
        }
    }

}

module.exports = AuthService;