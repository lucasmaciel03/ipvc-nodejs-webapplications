import Router from "express";
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const userRoutes = Router();

// Criar userRoutes para o CRUD de users
// GET all users
userRoutes.get("/1.1", getAllUsers);

// GET user by ID (search "express define route param") else send 404
userRoutes.get("/1.2/:id", getUserById);

// ADD new user
userRoutes.post("/1.3", addUser);

// UPDATE user by ID  if not found send 404
userRoutes.put("/1.4/:id", updateUser);

// DELETE user by ID if not found send 404
userRoutes.delete("/1.5/:id", deleteUser);

export { userRoutes };
