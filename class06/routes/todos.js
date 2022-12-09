import Router from "express";
import {
    getAllTodos,
    getTodoByID,
    createNewTodo,
    updateToDo,
    updateToDoStatus,
    deleteToDo,
} from "../controllers/todos.js";

const TodosRoutes = Router();

//CRUD

// {host}/api/todos
TodosRoutes.get("/", getAllTodos);

// create new todo
TodosRoutes.post("/newtodo", createNewTodo);

// find todo by id
TodosRoutes.get("/findtodo/:id", getTodoByID);

// update todo 
TodosRoutes.put("/updatetodo/:id", updateToDo);

// update todo done automatically
TodosRoutes.put("/updatetododone/:id", updateToDoStatus);

// delete todo
TodosRoutes.delete("/deletetodo/:id", deleteToDo);

export { TodosRoutes };

