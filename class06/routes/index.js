import Router from "express";
import {
    getAllTodos,
    getTodoByID,
    createNewTodo,
    updateToDo,
    updateToDoStatus,
    deleteToDo,
} from "../controllers/todos.js";
const routes = Router();

// {host}/api/todos

routes.get("/", getAllTodos);

//CRUD
// create new todo
routes.post("/newtodo", createNewTodo);

// find todo by id
routes.get("/findtodo/:id", getTodoByID);

// update todo 
routes.put("/updatetodo/:id", updateToDo);

// update todo done automatically
routes.put("/updatetododone/:id", updateToDoStatus);

// delete todo
routes.delete("/deletetodo/:id", deleteToDo);

export { routes };