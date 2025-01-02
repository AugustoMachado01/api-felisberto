const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  return user;
};

module.exports = getUserByToken;
