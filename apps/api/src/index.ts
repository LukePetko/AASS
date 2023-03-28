import { createServer } from "./server";
import { log } from "logger";
import authRouter from "./routes/authRouter";

const port = process.env.API_PORT || 5001;
const server = createServer();

server.use("/auth", authRouter);

server.listen(port, () => {
  log(`api running on ${port}`);
});
