const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Verificar la validez del token JWT
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
