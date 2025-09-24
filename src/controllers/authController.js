class AuthController {

  constructor(authService) {
    if (AuthController.instance) {
      return AuthController.instance;
    }
    this.authService = authService;
    AuthController.instance = this;
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const response = await this.authService.login(email, password);
      res.status(response.status).json(response);
    } catch (err) {
        console.log(err);
      res.status(500).json({status: 500, message: 'Internal server error' });
    }
  }
}

module.exports = AuthController;