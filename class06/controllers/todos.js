import { TodoModel } from "../models/todos.js";

export const getAllTodos = async (req, res) => {
    const todos = await TodoModel.findAll();
    res.send(todos);
};

export const getTodoByID = async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findByPk(id);
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send("Todo not found");
    }
};

export const createNewTodo = async (req, res) => {
    const { content } = req.body;
    const todo = await TodoModel.create({
        content
    });
    res.send(todo);
};

export const updateToDo = async (req, res) => {
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
};

export const updateToDoStatus = async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findByPk(id);
    if (todo) {
        todo.done = !todo.done;
        await todo.save();
        res.send(todo);
    } else {
        res.status(404).send("Todo not found");
    }
  
};

export const deleteToDo = async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findByPk(id);
    if (todo) {
        await todo.destroy();
        res.send("Todo deleted");
    } else {
        res.status(404).send("Todo not found");
    }
};
