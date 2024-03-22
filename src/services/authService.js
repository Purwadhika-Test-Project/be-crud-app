const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository, jwtSecret) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return userId;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({ userId: user.id }, this.jwtSecret);
    return token;
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded.userId;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = AuthService;
