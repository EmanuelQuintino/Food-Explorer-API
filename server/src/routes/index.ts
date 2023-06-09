import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { plateRoutes } from "./plateRoutes";
import { orderRoutes } from "./orderRoutes";
import { favoritesRoutes } from "./favoritesRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(orderRoutes);
routes.use(favoritesRoutes);
routes.use(plateRoutes);

export { routes };
