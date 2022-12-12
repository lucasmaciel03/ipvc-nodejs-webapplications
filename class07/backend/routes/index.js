import Router from "express";
import { userRoutes } from "../routes/users.js";

const routes = Router();

// npm i --save sequelize mysql mysql2

// {host}/api/hello
routes.get("/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

routes.use("/user", userRoutes);

export { routes };