import { UserModel } from "../models/users.js";

export const getAllUsers = async (req, res) => {
  const users = await UserModel.findAll();

  res.send({ users });
};

export const getUserById = async (req, res) => {
  const user = await UserModel.findByPk(req.params.id);

  if (user) {
    res.send({ user });
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

export const addUser = async (req, res) => {
  const user = await UserModel.create(req.body);

  res.status(201).send({ user, message: "User created" });
};

export const updateUser = async (req, res) => {
  const user = await UserModel.findByPk(req.params.id);

  if (user) {
    await user.update(req.body);
    res.status(201).send({ user, message: "User updated " });
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await UserModel.findByPk(req.params.id);

  if (user) {
    await user.destroy();
    res.status(201).send({ message: "User deleted" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
  
};
