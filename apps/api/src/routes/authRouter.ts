import { Router } from "express";
import { PrismaClient } from "database";
import { log } from "logger";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Logging in user!", { username, password });

  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
    select: {
      id: true,
    },
  });

  console.log("User", user);

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

  const holidayInfo = await fetch("http://localhost:3004/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      originalDays: 28,
      remainingDays: 28,
    }),
  });

  res.status(201).send({ user, holidayInfo });
});

export default router;
