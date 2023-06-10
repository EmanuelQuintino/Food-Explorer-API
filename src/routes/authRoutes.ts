import { Router } from "express";
import { authControllers } from "../controllers/authControllers";

const authRoutes = Router();

authRoutes.post("/login", authControllers.login);

export { authRoutes };