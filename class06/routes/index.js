import Router from "express";
import { TodosRoutes } from "./todos.js";
import { BooksRoutes } from "./books.js";
const routes = Router();

routes.use("/todos", TodosRoutes);
routes.use("/books", BooksRoutes);

export { routes };