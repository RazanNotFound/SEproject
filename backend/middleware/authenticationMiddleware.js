
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const cookie = req.cookies;

  if (!cookie || !cookie.token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = cookie.token;

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = decoded.user; // contains { userId, role }
    next();
  });
};

module.exports = authenticationMiddleware;
