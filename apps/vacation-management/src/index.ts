import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "database";
import fetch from "node-fetch";
import { Client, logger, Variables } from "camunda-external-task-client-js";

const prisma = new PrismaClient();

const port = process.env.VACATION_MANAGEMENT_PORT || 5001;
const server = createServer();

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

const client = new Client(config);

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

client.subscribe("vacation-request", async ({ task, taskService }) => {
  const id = task.variables.get("id");
  const start = task.variables.get("start");
  const end = task.variables.get("end");
  const note = task.variables.get("note");

  console.log(task.variables.getAll());
  console.log(id, start, end, note);

  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  console.log(user);

  const vacation = await prisma.vacation.create({
    data: {
      start: new Date(start),
      end: new Date(end),
      note,
      user: {
        connect: {
          id: Number(id),
        },
      },
      status: "PENDING",
    },
  });

  console.log("a");

  const processVariables = new Variables();
  processVariables.set("vacationId", vacation.id);
  processVariables.set("name", `${user?.firstName} ${user?.lastName}`);
  processVariables.set("start", start);
  processVariables.set("end", end);
  processVariables.set("note", note);

  console.log("b");

  await taskService.complete(task, processVariables);

  console.log("c");
});

client.subscribe("vacation-recalculation", async ({ task, taskService }) => {
  const id = task.variables.get("vacationInfoId");
  const remainingDays = task.variables.get("remainingDays");

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

  await taskService.complete(task);
});

client.subscribe("vacation-approval", async ({ task, taskService }) => {
  const id = task.variables.get("vacationId");
  const action = task.variables.get("action");

  /*
  if (!id || !action) {
    return res.status(400).send("Missing required fields");
  }
  */

  const vacation = await prisma.vacation.update({
    where: {
      id: Number(id),
    },
    data: {
      status: action,
    },
  });

  let remainingDays = -1;
  let vacationInfo;

  if (action && action === "APPROVED") {
    vacationInfo = await prisma.vacationInfo.findFirst({
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

    remainingDays = vacationInfo.remainingDays - days;
  }

  const processVariables = new Variables();
  if (remainingDays !== -1) {
    processVariables.set("remainingDays", remainingDays);
    processVariables.set("vacationInfoId", vacationInfo?.id);
  }

  await taskService.complete(task, processVariables);
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
