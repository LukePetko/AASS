import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const port = process.env.USER_MANAGEMENT_PORT || 3001;
const server = createServer();

server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    res.status(401).send("Invalid username or password");
  }

  res.send(user);
});

server.post("/register", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });

  const holidayInfo = await fetch(
    `http://localhost:${process.env.VACATION_MANAGEMENT_PORT}/CREATE`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        originalDays: 28,
        remainingDays: 28,
      }),
    }
  );

  res.status(201).send({ user, holidayInfo });
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
