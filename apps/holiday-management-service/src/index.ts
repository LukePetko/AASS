import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const port = process.env.HOLIDAY_MANAGEMENT_PORT || 5001;
const server = createServer();

server.post("/create", async (req, res) => {
  const { id, start, end, note } = req.body;

  const holiday = await prisma.holiday.create({
    data: {
      start,
      end,
      note,
      user: {
        connect: {
          id,
        },
      },
      status: "PENDING",
    },
  });

  res.status(201).json(holiday);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
