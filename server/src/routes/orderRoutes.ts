import { Router } from "express";
import { orderControllers } from "../controllers/orderControllers";
import { authMiddleware } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const orderRoutes = Router();

orderRoutes.post("/orders", authMiddleware, orderControllers.create);
orderRoutes.get("/orders", authMiddleware, orderControllers.read);
orderRoutes.get("/orders/index", authMiddleware, isAdmin, orderControllers.index);
orderRoutes.put("/orders/:id", authMiddleware, isAdmin, orderControllers.update);
orderRoutes.delete("/orders/:id", authMiddleware, isAdmin, orderControllers.delete);

export { orderRoutes };
