import { Router } from "express";
import { PrismaClient } from "database";
import { log } from "logger";

const prisma = new PrismaClient();

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Logging in user", { username, password });

  const user = prisma.user.find({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  res.send(user);
});

router.post("/register", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  console.log("Registering user", { username, password, firstName, lastName });

  const user = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });

  res.status(201).send(user);
});

export default router;
