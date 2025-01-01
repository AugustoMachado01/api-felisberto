const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { name, age, email, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é  obrigatŕio!" });
      return;
    }

    if (age.lenght <= 0) {
      res.status(422).json({ message: "A idade invalida!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatória" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "Senhas diferentes" });
      return;
    }

    //check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      res.status(422).json({
        message: "Este email já está em uso. Por favor, utilize outro!",
      });
      return;
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = await prisma.user.create({
      data: { name, email, age, password: passwordHash },
    });

    // Remove the password field from the response
    delete user.password;

    res.status(201).json({ message: "User created successfully", user });
  }
};
