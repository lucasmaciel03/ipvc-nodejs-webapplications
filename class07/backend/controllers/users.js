import { UserModel } from "../models/users.js";
import { createToken } from "../utils/jwt.js";

export const getAllUsers = async (req, res) => {
  console.log(req.user)
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

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    where: {
      username: username,
      password: password,
    },
  });

  if (!user) {
    return res.status(500).json({
      message: "CREDENCIAIS ERRADAS",
    });
  }

  const token = createToken({
    id: user.id,
    username: user.username,
    batatas: 2,
  });
  return res.send({
    message: "LOGIN FEITO",
    token,
  });
};


