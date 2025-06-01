import express, { Request, Response } from "express";
import app from "../../app";
import fs from "fs";
import path from "path";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";

export const todosRouter = express.Router();

const filePath = path.join(__dirname, "../../../db/todo.json");

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todos = await collection.find().toArray();
  res.send(todos);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { title, description, priority } = req.body;
  await collection.insertOne({
    title,
    description,
    priority,
    isCompleted: false,
  });

  const todos = await collection.find().toArray();

  res.json(todos);
});

todosRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todo = await collection.findOne({ _id: new ObjectId(id) });
  res.send(todo);
});

todosRouter.delete("/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { id } = req.params;
  const data = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send(data);
});

todosRouter.put("/:id", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  const updateData = {
    $set: body,
  };
  const data = await collection.updateOne(
    { _id: new ObjectId(id) },
    updateData,
    { upsert: true }
  );

  res.send(data);
});
