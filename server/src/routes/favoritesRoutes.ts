import { Router } from "express";
import { favoritesControllers } from "../controllers/favoritesControllers";
import { authMiddleware } from "../middlewares/auth";

const favoritesRoutes = Router();

favoritesRoutes.post("/favorites/:plateID", authMiddleware, favoritesControllers.create);
favoritesRoutes.delete("/favorites/:plateID", authMiddleware, favoritesControllers.delete);

export { favoritesRoutes };
