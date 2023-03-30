import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const port = process.env.HOLIDAY_INFO_PORT || 5001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
