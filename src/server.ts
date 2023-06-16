import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import { prisma } from "./databases";
import { pageNotFoundError } from "./errors/pageNotFound";
import { appError } from "./errors/appError";
import dotenv from 'dotenv';
import { UPLOADS_FOLDER } from "./configs/upload";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(UPLOADS_FOLDER));
app.use(routes);

app.use(pageNotFoundError);
app.use(appError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

prisma.$connect()
  .then(() => console.log("Database is connected..."))
  .catch((error) => console.error(error));