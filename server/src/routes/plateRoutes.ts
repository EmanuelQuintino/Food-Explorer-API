import { Router } from "express";
import { plateControllers } from "../controllers/plateControllers";
import { authMiddleware } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import multer from "multer";
import { MULTER } from "../configs/upload";

const plateRoutes = Router();
const upload = multer(MULTER);

plateRoutes.get("/plates", authMiddleware, plateControllers.read);

plateRoutes.use(authMiddleware, isAdmin);
plateRoutes.post("/plates", upload.single("image"), plateControllers.create);
plateRoutes.put("/plates/:id", upload.single("image"), plateControllers.update);
plateRoutes.delete("/plates/:id", plateControllers.delete);
plateRoutes.patch("/plates/image/:id", upload.single("image"), plateControllers.patch);

export { plateRoutes };
