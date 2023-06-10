import { Router } from "express";
import { orderControllers } from "../controllers/orderControllers";
import { authMiddleware } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.post("/orders", orderControllers.create);
orderRoutes.get("/orders", orderControllers.read);
orderRoutes.get("/orders/index", isAdmin, orderControllers.index);
orderRoutes.put("/orders/:id", isAdmin, orderControllers.update);
orderRoutes.delete("/orders/:id", isAdmin, orderControllers.delete);

export { orderRoutes };
