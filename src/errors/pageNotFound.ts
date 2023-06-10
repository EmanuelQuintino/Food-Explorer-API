import { Request, Response, NextFunction } from "express";
import { newAppError } from "../utils/newAppError";

export function pageNotFoundError(req: Request, res: Response, next: NextFunction) {
  const error: any = newAppError('Page not found', 404);
  next(error);
};
