import { NextFunction, Request, Response } from "express";
import { prisma } from "../databases";
import { z } from "zod";
import { newAppError } from "../utils/newAppError";

export const orderControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plateSchema = z.array(
        z.object({
          plateID: z.string()
            .min(3, "Nome com mínimo de 3 caracteres")
            .max(255, "Campo com tamanho máximo de 255 caracteres"),
          amount: z.number()
            .positive("A quantidade deve ser um número positivo")
            .max(99, "O valor máximo permitido é 99"),
        }).strict()
      );

      const orders = plateSchema.parse(req.body);
      const userID = req.userID;

      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      const platesID = orders.map(order => order.plateID)
      const plates = await prisma.plates.findMany({
        where: {
          id: {
            in: platesID,
          },
        },
      });

      const existingPlateIDs = plates.map(plate => plate.id);
      const missingPlates = platesID.filter(plateID => !existingPlateIDs.includes(plateID));
      if (missingPlates.length > 0) throw newAppError(`Pratos não localizados: ${missingPlates.join(', ')}`, 404);

      const orderData = orders.map(order => {
        const plateMatch = plates.find(plate => plate.id === order.plateID);
        return {
          plateID: order.plateID,
          amount: order.amount,
          price: Number(plateMatch?.price),
        };
      });

      type OrderTypes = {
        plateID: string;
        amount: number;
        price: number;
      };

      const maxCodeOrder = await prisma.orders.findFirst({
        select: {
          code: true,
        },
        orderBy: {
          code: 'desc',
        },
      });

      const nextCode = maxCodeOrder ? maxCodeOrder.code + 1 : 1;

      await prisma.orders.create({
        data: {
          user_id: userID,
          code: nextCode,
          order_plates: {
            create: orderData.map((order: OrderTypes) => ({
              plate_id: order.plateID,
              amount: order.amount,
              price: order.price,
            })),
          },
        }
      });

      return res.status(201).json("Pedido realizado com sucesso");
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      if (error.code === "P2003") return res.status(404).json({ error: "Prato não encontrado" });
      return next(error);
    };
  },

  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.userID;
      if (!id) throw newAppError("Por favor inserir o ID do usuário", 400);

      const { search } = req.query;

      if (search) {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: 'desc' },
          where: {
            OR: [
              { code: { equals: Number(search) || undefined } },
              { status: { contains: String(search) || undefined } },
            ],
          },
        });
        return res.status(200).json(orders);
      } else {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: 'desc' },
          take: 30,
        });
        return res.status(200).json(orders);
      };
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  read: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const { search } = req.query;
      const userID = req.userID;

      if (!userID) throw newAppError("Por favor inserir o ID do usuário", 400);

      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user) throw newAppError('Usuário não encontrado', 404);

      if (id) {
        const order = await prisma.orders.findUnique({
          where: { id: String(id) },
          include: { order_plates: true }
        });
        if (!order) throw newAppError('Pedido não encontrado', 404);
        if (order?.user_id != userID) throw newAppError('Sem autorização para acessar este pedido', 401);

        return res.status(200).json(order);
      } else {
        if (search) {
          const orders = await prisma.orders.findMany({
            include: { order_plates: true },
            orderBy: { code: 'desc' },
            where: {
              user_id: userID,
              OR: [
                { code: { equals: Number(search) || undefined } },
                { status: { contains: String(search) || undefined } },
              ],
            },
          });
          return res.status(200).json(orders);
        } else {
          const orders = await prisma.orders.findMany({
            where: { user_id: userID },
            include: { order_plates: true },
            orderBy: { code: 'desc' },
            take: 30,
          });
          return res.status(200).json(orders);
        }
      };
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSchema = z.object({
        status: z.string()
          .refine(value => ['Pendente', 'Preparando', 'Entregue'].includes(value), {
            message: 'O status deve ser preenchido com "Pendente", "Preparando" ou "Entregue"',
          }),
      }).strict();

      const { id } = req.params;
      const { status } = userSchema.parse(req.body);

      if (!id) throw newAppError("Por favor inserir o ID do pedido", 400);

      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order) throw newAppError('Pedido não encontrado', 404);

      await prisma.orders.update({
        data: { status },
        where: { id: String(id) },
      });

      return res.status(200).json(`Status do pedido atualizado para '${status}'`);
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      return next(error);
    };
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw newAppError("Por favor inserir o ID do pedido", 400);

      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order) throw newAppError('Pedido não encontrado', 404);

      await prisma.orders.delete({ where: { id: String(id) } });

      return res.status(200).json('Pedido deletado com sucesso');
    } catch (error: any) {
      if (error.code === "P2021") return res.status(500).json("Tabela não encontrada");
      if (error.code === "P2003") return res.status(404).json({ error: "Prato não encontrado" });
      return next(error);
    };
  },
}
