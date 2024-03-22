class ExpressAdapter {
  constructor(app, authService, userService) {
    this.app = app;
    this.authService = authService;
    this.userService = userService;
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.post("/register", async (req, res) => {
      const { username, email, password } = req.body;
      try {
        const userId = await this.authService.register(
          username,
          email,
          password
        );
        res.status(201).json({ userId });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const token = await this.authService.login(email, password);
        res.json({ token });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    });

    this.app.get("/users", async (req, res) => {
      try {
        const users = await this.userService.getAllUsers();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get("/users/:id", async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await this.userService.getUser(userId);
        res.json(user);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    });

    this.app.put("/users/:id", async (req, res) => {
      const userId = req.params.id;
      const { username, email } = req.body;
      try {
        const updatedUser = await this.userService.updateUser(
          userId,
          username,
          email
        );
        res.json(updatedUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.delete("/users/:id", async (req, res) => {
      const userId = req.params.id;
      try {
        const deletedUser = await this.userService.deleteUser(userId);
        res.json(deletedUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  }
}

module.exports = ExpressAdapter;
