"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_route_1 = require("./app/todos/todo.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todos", todo_route_1.todosRouter);
app.get("/", (req, res, next) => {
    try {
        res.send("Welcome to do app");
    }
    catch (error) {
        next(error);
    }
});
app.use((req, res) => {
    res.status(404).json({ message: "Route not found", status: 404 });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "something went wrong! from global error handler" });
    }
});
// app.get("/todos", (req: Request, res: Response) => {
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   console.log(data);
//   res.json(data);
// });
exports.default = app;
/**
 * ? Basic file structure
 * * server - server handling like - starting, closing, error handling of servers - only related to server
 * * app file - routing handle, middleware, route related error
 * * app folder - app business logic handling like CRUD, database related works
 */ 
