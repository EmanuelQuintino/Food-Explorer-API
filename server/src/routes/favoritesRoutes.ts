import { Router } from "express";
import { favoritesControllers } from "../controllers/favoritesControllers";
import { authMiddleware } from "../middlewares/auth";

const favoritesRoutes = Router();

favoritesRoutes.use(authMiddleware);

favoritesRoutes.post("/favorites/:plateID", favoritesControllers.create);
favoritesRoutes.delete("/favorites/:plateID", favoritesControllers.delete);

export { favoritesRoutes };
