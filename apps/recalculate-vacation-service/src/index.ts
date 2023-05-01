import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

const port = process.env.RECALCULATE_VACATION_PORT || 5001;
const server = createServer();

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "recalculate-vacation" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "recalculate", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { id, remainingDays } = JSON.parse(message.value.toString());

      await prisma.vacationInfo.updateMany({
        where: {
          id,
        },
        data: {
          remainingDays,
        },
      });
    },
  });
};

run().catch(console.error);

server.listen(port, () => {
  log(`api running on ${port}`);
});
