import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./app/todos/todo.route";

const app: Application = express();
app.use(express.json());
app.use("/todos", todosRouter);





app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Welcome to do app"); 
  } catch (error) {
    next(error);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({message:"Route not found", status: 404})
})

app.use((error : any, req: Request, res: Response, next: NextFunction) => {
  if(error) {
    console.log("error", error);
    res.status(400).json({message: "something went wrong! from global error handler"});
  }
})

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