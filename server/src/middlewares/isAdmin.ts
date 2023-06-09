import { Request, Response, NextFunction } from "express";
import { prisma } from "../databases";
import { newAppError } from "../utils/newAppError";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.userID;
    const user = await prisma.users.findUnique({ where: { id: String(id) } });
    if (!user) throw newAppError('Usuário não encontrado', 404);
    if (!user.is_admin) throw newAppError('Usuário não autorizado', 401);
    return next();
  } catch (error) {
    return next(error)
  };
};