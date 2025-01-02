const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  return token;
};

module.exports = getToken;
