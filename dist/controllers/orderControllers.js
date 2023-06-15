"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/orderControllers.ts
var orderControllers_exports = {};
__export(orderControllers_exports, {
  orderControllers: () => orderControllers
});
module.exports = __toCommonJS(orderControllers_exports);

// src/databases/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error"]
});

// src/controllers/orderControllers.ts
var import_zod = require("zod");

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/controllers/orderControllers.ts
var orderControllers = {
  create: async (req, res, next) => {
    try {
      const plateSchema = import_zod.z.array(
        import_zod.z.object({
          plateID: import_zod.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
          amount: import_zod.z.number().positive("A quantidade deve ser um n\xFAmero positivo").max(99, "O valor m\xE1ximo permitido \xE9 99")
        }).strict()
      );
      const orders = plateSchema.parse(req.body);
      const userID = req.userID;
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      const platesID = orders.map((order) => order.plateID);
      const plates = await prisma.plates.findMany({
        where: {
          id: {
            in: platesID
          }
        }
      });
      const existingPlateIDs = plates.map((plate) => plate.id);
      const missingPlates = platesID.filter((plateID) => !existingPlateIDs.includes(plateID));
      if (missingPlates.length > 0)
        throw newAppError(`Pratos n\xE3o localizados: ${missingPlates.join(", ")}`, 404);
      const orderData = orders.map((order) => {
        const plateMatch = plates.find((plate) => plate.id === order.plateID);
        return {
          plateID: order.plateID,
          amount: order.amount,
          price: Number(plateMatch?.price)
        };
      });
      const maxCodeOrder = await prisma.orders.findFirst({
        select: {
          code: true
        },
        orderBy: {
          code: "desc"
        }
      });
      const nextCode = maxCodeOrder ? maxCodeOrder.code + 1 : 1;
      await prisma.orders.create({
        data: {
          user_id: userID,
          code: nextCode,
          order_plates: {
            create: orderData.map((order) => ({
              plate_id: order.plateID,
              amount: order.amount,
              price: order.price
            }))
          }
        }
      });
      return res.status(201).json("Pedido realizado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      if (error.code === "P2003")
        return res.status(404).json({ error: "Prato n\xE3o encontrado" });
      return next(error);
    }
    ;
  },
  index: async (req, res, next) => {
    try {
      const id = req.userID;
      if (!id)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const { search } = req.query;
      if (search) {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: "desc" },
          where: {
            OR: [
              { code: { equals: Number(search) || void 0 } },
              { status: { contains: String(search) || void 0 } }
            ]
          }
        });
        return res.status(200).json(orders);
      } else {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: "desc" },
          take: 30
        });
        return res.status(200).json(orders);
      }
      ;
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  read: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { search } = req.query;
      const userID = req.userID;
      if (!userID)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      if (id) {
        const order = await prisma.orders.findUnique({
          where: { id: String(id) },
          include: { order_plates: true }
        });
        if (!order)
          throw newAppError("Pedido n\xE3o encontrado", 404);
        if (order?.user_id != userID)
          throw newAppError("Sem autoriza\xE7\xE3o para acessar este pedido", 401);
        return res.status(200).json(order);
      } else {
        if (search) {
          const orders = await prisma.orders.findMany({
            include: { order_plates: true },
            orderBy: { code: "desc" },
            where: {
              user_id: userID,
              OR: [
                { code: { equals: Number(search) || void 0 } },
                { status: { contains: String(search) || void 0 } }
              ]
            }
          });
          return res.status(200).json(orders);
        } else {
          const orders = await prisma.orders.findMany({
            where: { user_id: userID },
            include: { order_plates: true },
            orderBy: { code: "desc" },
            take: 30
          });
          return res.status(200).json(orders);
        }
      }
      ;
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  update: async (req, res, next) => {
    try {
      const userSchema = import_zod.z.object({
        status: import_zod.z.string().refine((value) => ["Pendente", "Preparando", "Entregue"].includes(value), {
          message: 'O status deve ser preenchido com "Pendente", "Preparando" ou "Entregue"'
        })
      }).strict();
      const { id } = req.params;
      const { status } = userSchema.parse(req.body);
      if (!id)
        throw newAppError("Por favor inserir o ID do pedido", 400);
      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order)
        throw newAppError("Pedido n\xE3o encontrado", 404);
      await prisma.orders.update({
        data: { status },
        where: { id: String(id) }
      });
      return res.status(200).json(`Status do pedido atualizado para '${status}'`);
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id)
        throw newAppError("Por favor inserir o ID do pedido", 400);
      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order)
        throw newAppError("Pedido n\xE3o encontrado", 404);
      await prisma.orders.delete({ where: { id: String(id) } });
      return res.status(200).json("Pedido deletado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      if (error.code === "P2003")
        return res.status(404).json({ error: "Prato n\xE3o encontrado" });
      return next(error);
    }
    ;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orderControllers
});
