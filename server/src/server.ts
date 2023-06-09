import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import { prisma } from "./databases";
import { pageNotFoundError } from "./errors/pageNotFound";
import { appError } from "./errors/appError";
import dotenv from 'dotenv';
import { UPLOADS_FOLDER } from "./configs/upload";
import cors from "cors";

const app = express();
app.listen(3000, () => console.log("Server is running on port 3000"));

app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/images", express.static(UPLOADS_FOLDER));
dotenv.config();

app.use(routes);

app.use(pageNotFoundError);
app.use(appError);

prisma.$connect()
  .then(() => console.log("Database is connected.."))
  .catch((error) => console.error(error));