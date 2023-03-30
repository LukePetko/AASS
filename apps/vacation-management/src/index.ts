import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const port = process.env.VACATION_MANAGEMENT_PORT || 5001;
const server = createServer();

server.post("/create-vacation-info", async (req, res) => {
  const { id, originalDays, remainingDays } = req.body;

  if (!id || !originalDays || !remainingDays) {
    return res.status(400).send("Missing required fields");
  }

  const vacationInfo = await prisma.vacationInfo.create({
    data: {
      originalDays,
      remainingDays,
      user: {
        connect: {
          id,
        },
      },
    },
  });

  res.status(201).send(vacationInfo);
});

server.get("/get-vacation-info/", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const vacationInfo = await prisma.vacationInfo.findFirst({
    where: {
      userId: Number(id),
    },
  });

  res.send(vacationInfo);
});

server.post("/request-vacation", async (req, res) => {
  const { id, start, end, note } = req.body;

  const vacation = await prisma.vacation.create({
    data: {
      start: new Date(start),
      end: new Date(end),
      note,
      user: {
        connect: {
          id,
        },
      },
      status: "PENDING",
    },
  });

  res.status(201).json(vacation);
});

server.post("/recalculate-vacation-info", async (req, res) => {
  const { id, remainingDays } = req.body;

  if (!id || !remainingDays) {
    return res.status(400).send("Missing required fields");
  }

  const vacationInfo = await prisma.vacationInfo.updateMany({
    where: {
      userId: Number(id),
    },
    data: {
      remainingDays,
    },
  });

  res.status(201).send(vacationInfo);
});

server.post("/approve-vacation", async (req, res) => {
  const { id, action } = req.body;

  if (!id || !action) {
    return res.status(400).send("Missing required fields");
  }

  const vacation = await prisma.vacation.update({
    where: {
      id: Number(id),
    },
    data: {
      status: action,
    },
  });

  res.send(vacation);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
