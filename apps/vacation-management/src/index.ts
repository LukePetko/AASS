import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const port = process.env.HOLIDAY_INFO_PORT || 5001;
const server = createServer();

server.get("/", async (req, res) => {
  const { id } = req.body;

  const holidayInfo = await prisma.holidayInfo.findFirst({
    where: {
      userId: id,
    },
  });

  res.send(holidayInfo);
});

server.post("/create", async (req, res) => {
  const { id, originalDays, remainingDays } = req.body;

  const holidayInfo = await prisma.holidayInfo.create({
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

  res.status(201).send(holidayInfo);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
