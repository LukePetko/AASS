import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";
import fetch from "node-fetch";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

const port = process.env.VACATION_MANAGEMENT_PORT || 5001;
const server = createServer();

const kafka = new Kafka({
  clientId: "notification-management",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
};

run().catch(console.error);

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

  console.log(id, start, end, note);

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

  console.log(id, remainingDays);

  if (!id || !remainingDays) {
    return res.status(400).send("Missing required fields");
  }

  const vacationInfo = await prisma.vacationInfo.updateMany({
    where: {
      id,
    },
    data: {
      remainingDays,
    },
  });

  res.status(200).send(vacationInfo);
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

  if (action && action === "APPROVED") {
    const vacationInfo = await prisma.vacationInfo.findFirst({
      where: {
        userId: vacation.userId,
      },
    });

    if (!vacationInfo) {
      return res.status(400).send("Missing required fields");
    }

    const days = Math.ceil(
      Math.abs(vacation.start - vacation.end) / (1000 * 60 * 60 * 24)
    );

    console.warn(days);

    const remainingDays = vacationInfo.remainingDays - days;

    await fetch("http://localhost:3002/recalculate-vacation-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: vacationInfo.id,
        remainingDays,
      }),
    });

    await producer.send({
      topic: "notification",
      messages: [
        {
          value: JSON.stringify({
            userId: vacation.userId,
            message: `Your vacation request from ${vacation.start} to ${vacation.end} has been approved`,
          }),
        },
      ],
    });
  }

  res.send(vacation);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
