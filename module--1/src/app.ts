import express, { Application, Request, Response } from "express";
import { todosRouter } from "./app/todos/todo.route";

const app: Application = express();
app.use(express.json());
app.use("/todos", todosRouter);





app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to do app");
});

// app.get("/todos", (req: Request, res: Response) => {
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   console.log(data);
//   res.json(data);
// });

export default app;


/**
 * ? Basic file structure
 * * server - server handling like - starting, closing, error handling of servers - only related to server
 * * app file - routing handle, middleware, route related error
 * * app folder - app business logic handling like CRUD, database related works
 */