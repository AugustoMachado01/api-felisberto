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

  static async getAllUserTasks(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const tasks = await prisma.task.findMany({ where: { userdId: user.id } });

    res.status(200).json(tasks);
  }

  static async updateTask(req, res) {
    const { id } = req.params;

    const { title } = req.body;

    const task = await prisma.task.findFirst({ where: { id: Number(id) } });

    console.log("task==", task);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (task.userdId !== user.id) {
      res.status(422).json({ error: "There was a problem, try later" });
      return;
    }

    await prisma.task.update({ where: { id: Number(id) }, data: { title } });

    res.status(200).json({ message: "task updated successfully" });
  }

  static async removeTaskById(req, res) {
    const { id } = req.params;

    const token = getToken(req);
    const user = await getUserByToken(token);

    // check if task exists
    const task = await prisma.task.findFirst({ where: { id: Number(id) } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    if (task.userdId !== user.id) {
      res.status(422).json({ error: "There was a problem, try later" });
      return;
    }

    await prisma.task.delete({ where: { id: Number(id) } });

    res.status(200).send("delete success");
  }
};
