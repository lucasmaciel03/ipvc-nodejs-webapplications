import Router from "express";
import { TodoModel } from "../models/todos.js";

const routes = Router();

// {host}/api/todos

routes.get("/", async(req, res) => {
    const todos = await TodoModel.findAll();
    res.send(todos);
});

// create new todo
routes.post("/newtodo", async(req, res) => {
    const { content } = req.body;
    const newTodo = await TodoModel.create({ content });
    res.send(newTodo);
});

// update todo 
routes.put("/updatetodo/:id", async(req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const todo = await TodoModel.findByPk(id);
    if (todo) {
        todo.content = content;
        await todo.save();
        res.send(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});
export { routes };
