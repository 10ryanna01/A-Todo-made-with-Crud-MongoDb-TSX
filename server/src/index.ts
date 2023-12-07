import express, { Request, Response } from "express";

import { config } from "dotenv";
config();
import mongoose from "mongoose";
import cors from "cors";
const Port = 5000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
import TodoTaskModel from "./models/TodoTask";
app.use(express.json());

app.get("/todotasks", async (req: Request, res: Response) => {
  // Todo get all Todos from DB
  // 1. fetch data from mongo
  const todotasks = await TodoTaskModel.find();
  console.log(todotasks);
  // 2 send back array to the UI
  res.json(todotasks);
});

app.post("/todotasks", async (req: Request, res: Response) => {
  console.log(req.body);
  const newTodoTask = new TodoTaskModel({
    title: req.body.title,
  });

  const createTodoTask = await newTodoTask.save();
  res.json(createTodoTask);
});

app.delete("/todotasks/:taskId", async (req: Request, res: Response) => {
  // Todo delete a Todo based on its ID
  // 1.  get the todo ID from the Url
  const taskId = req.params.taskId;
  // 2. delete the todo from mongodb
  const task = await TodoTaskModel.findByIdAndDelete(taskId);
  res.json(task);
  // 3. return the updated Todos to the user
});

app.put("/todotasks/:taskId", async (req: Request, res: Response) => {
  // Todo delete a Todo based on its ID
  // 1.  get the todo ID from the Url
  const taskId = req.params.taskId;
  // 2. delete the todo from mongodb
  const task = await TodoTaskModel.findByIdAndDelete(taskId);
  res.json(task);
  // 3. return the updated Todos to the user
});

mongoose
  .connect(process.env.MONGO_CFG ?? "this.is.a.fallbackaddress")
  .then(() => {
    console.log(` server is ready and listening on port ${Port}`);

    app.listen(Port);
  });
