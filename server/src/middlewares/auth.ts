import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../configs/auth"
import { newAppError } from "../utils/newAppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) throw newAppError('Por favor informar token', 401);

    const token = headerToken.split(' ');
    if (token.length != 2) throw newAppError('Token inválido', 401);
    if (!/^Bearer$/i.test(token[0])) throw newAppError('Token inválido', 401);

    jwt.verify(token[1], String(auth.secret), (error, decoded: any) => {
      if (error) throw newAppError('Token inválido', 401);
      req.userID = decoded.id;
      return next();
    });
  } catch (error) {
    return next(error);
  };
};