import { NextFunction, Request, Response } from "express";
import { prisma } from "../databases";
import { z } from "zod";
import bcrypt from "bcrypt";
import { excludeFields } from "../utils/excludeFields";
import { newAppError } from "../utils/newAppError";

export const userControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSchema = z.object({
        name: z.string()
          .min(3, "Nome com mínimo de 3 caracteres")
          .max(255, "Campo com tamanho máximo de 255 caracteres"),
        email: z.string()
          .email("Por favor insira um email válido")
          .max(255, "Campo com tamanho máximo de 255 caracteres"),
        password: z.string()
          .min(6, "Senha com mínimo de 6 carácteres")
          .max(255, "Campo com tamanho máximo de 255 caracteres")
      }).strict();

      const { name, email, password } = userSchema.parse(req.body);

      const userEmail = await prisma.users.findUnique({ where: { email: String(email) } });
      if (userEmail) throw newAppError("Email já cadastrado", 409);

      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.users.create({ data: { name, email, password: passwordHash } });

      return res.status(201).json("Usuário cadastrado com sucesso");
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.userID;
      if (!id) throw newAppError("Por favor insirar o ID do usuário", 400);

      const users = await prisma.users.findMany({
        include: {
          orders: {
            include: {
              order_plates: true
            }
          },
          favorites: true
        }
      });

      const usersExcludeFields = users.map((user) => {
        return excludeFields(user, ["password", "is_admin"]);
      });

      return res.status(200).json(usersExcludeFields);
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  read: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.userID;
      if (!id) throw newAppError("Por favor insirar o ID do usuário", 400);

      const user = await prisma.users.findUnique({
        where: { id: String(id) },
        include: {
          orders: {
            include: {
              order_plates: true
            }
          },
          favorites: {
            orderBy: {
              created_at: 'desc'
            }
          }
        }
      });

      if (!user) throw newAppError('Usuário não encontrado', 404);

      return res.status(200).json(excludeFields(user, ["password", "is_admin"]));
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSchema = z.object({
        name: z.string()
          .min(3, "Nome com mínimo de 3 caracteres")
          .max(255, "Campo com tamanho máximo de 255 caracteres"),
        email: z.string()
          .email("Por favor insira um email válido")
          .max(255, "Campo com tamanho máximo de 255 caracteres"),
        password: z.string()
          .min(6, "Senha com mínimo de 6 carácteres")
          .max(255, "Campo com tamanho máximo de 255 caracteres")
      }).strict();

      const id = req.userID;
      const { name, email, password } = userSchema.parse(req.body);

      const user = await prisma.users.findUnique({ where: { id: String(id) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      const userEmail = await prisma.users.findUnique({ where: { email: String(email) } });
      if (userEmail && (user.email != userEmail.email)) {
        throw newAppError('Email já cadastrado', 409);
      };

      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.users.update({
        data: { name, email, password: passwordHash },
        where: { id: String(id) }
      });

      return res.status(200).json("Usuário atualizado com sucesso");
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.userID;
      if (!id) throw newAppError("Por favor insirar o ID do usuário", 400);

      const user = await prisma.users.findUnique({ where: { id: String(id) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      await prisma.users.delete({ where: { id: String(id) } });

      return res.status(200).json('Usuário deletado com sucesso');
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },
}
