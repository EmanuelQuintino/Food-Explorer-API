import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

type AppError = {
  status: number;
  message: string;
};

export function appError(error: AppError, req: Request, res: Response, next: NextFunction) {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(error.status || 500).json({ error: JSON.parse(error.message)[0].message });
  };

  return res.status(error.status || 500).json({ error: error.message });
};
