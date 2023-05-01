import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

const port = process.env.NOTIFICATION_MANAGEMENT_PORT || 5001;
const server = createServer();

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-management" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notification", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { userId, message: notificationMessage } = JSON.parse(
        message.value.toString()
      );

      await prisma.Notification.create({
        data: {
          userId,
          message: notificationMessage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
  });
};

run().catch(console.error);

server.get("/get-notifications", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const notifications = await prisma.Notification.findMany({
    where: {
      userId: Number(id),
      seen: false,
    },
  });

  return res.send(notifications);
});

server.get("/seen", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const notifications = await prisma.Notification.updateMany({
    where: {
      id: Number(id),
    },
    data: {
      seen: true,
    },
  });

  return res.send(notifications);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
