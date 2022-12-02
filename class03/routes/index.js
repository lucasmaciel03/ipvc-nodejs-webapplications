import Router from "express";
import { UserModel } from "../models/user.js";

const routes = Router();

// npm i --save sequelize mysql mysql2

//GET all data method route
routes.get("/hello", (req, res) => {
  res.send({message: "Hello World!"});
});

routes.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.send({users});
});

export { routes };


