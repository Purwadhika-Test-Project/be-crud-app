const jwt = require("jsonwebtoken");

const generateJwtSecret = () => {
  const secret = jwt.sign({}, "your_secret_key", { algorithm: "HS256" });
  return secret;
};

generateJwtSecret();
