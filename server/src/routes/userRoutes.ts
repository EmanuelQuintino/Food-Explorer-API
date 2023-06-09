import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const userRoutes = Router();

userRoutes.post("/users", userControllers.create);
userRoutes.get("/users/index", authMiddleware, isAdmin, userControllers.index);
userRoutes.get("/users", authMiddleware, userControllers.read);
userRoutes.put("/users", authMiddleware, userControllers.update);
userRoutes.delete("/users", authMiddleware, userControllers.delete);

export { userRoutes };