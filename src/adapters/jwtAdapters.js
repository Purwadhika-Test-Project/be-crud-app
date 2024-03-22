const jwt = require("jsonwebtoken");

class JwtAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  sign(payload) {
    return jwt.sign(payload, this.secret);
  }

  verify(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = JwtAdapter;
