import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const port = process.env.SUBORDINATE_MANAGEMENT_PORT || 5001;
const server = createServer();

server.get("/get-subordinates", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const subordinates = await prisma.user.findMany({
    where: {
      teamLeaderId: Number(id),
    },
  });

  res.send(subordinates);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
