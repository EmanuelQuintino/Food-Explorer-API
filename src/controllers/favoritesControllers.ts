import { NextFunction, Request, Response } from "express";
import { prisma } from "../databases";
import { newAppError } from "../utils/newAppError";

export const favoritesControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID = req.userID;
      const { plateID } = req.params;

      if (!userID) throw newAppError("Por favor inserir o ID do usuário", 400);

      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      const plate = await prisma.plates.findUnique({ where: { id: String(plateID) } });
      if (!plate) throw newAppError('Prato não encontrado', 404);

      const favorite = await prisma.favorites.findUnique({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID,
          }
        }
      });

      if (favorite) throw newAppError('Prato já favoritado', 404);

      await prisma.favorites.create({ data: { user_id: userID, plate_id: plateID } });

      return res.status(201).json("Prato listado em favoritos");
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      if (error.code === "P2002") return res.status(400).json("Prato já favoritado");
      return next(error);
    };
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID = req.userID;
      const { plateID } = req.params;

      if (!userID) throw newAppError("Por favor inserir o ID do usuário", 400);

      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      const plate = await prisma.plates.findUnique({ where: { id: String(plateID) } });
      if (!plate) throw newAppError('Prato não encontrado', 404);

      const favorite = await prisma.favorites.findUnique({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID,
          }
        }
      });

      if (!favorite) throw newAppError('Favorito não encontrado', 404);

      await prisma.favorites.delete({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID,
          }
        }
      });

      return res.status(200).json('Prato removido dos favoritos');
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      if (error.code === "P2003") return res.status(404).json({ error: "Prato não encontrado" });
      return next(error);
    };
  },
}
