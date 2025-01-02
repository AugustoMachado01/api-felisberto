const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getToken = require("../utils/get-token");
const getUserByToken = require("../utils/get-user-by-token");

module.exports = class TaskController {
  static async register(req, res) {
    const { title } = req.body;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const task = await prisma.task.create({
      data: { title, userdId: user.id },
    });
    res.status(201).json({ message: "create task success!", tasks: task });
  }
};
