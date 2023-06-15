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

// src/controllers/favoritesControllers.ts
var favoritesControllers_exports = {};
__export(favoritesControllers_exports, {
  favoritesControllers: () => favoritesControllers
});
module.exports = __toCommonJS(favoritesControllers_exports);

// src/databases/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error"]
});

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/controllers/favoritesControllers.ts
var favoritesControllers = {
  create: async (req, res, next) => {
    try {
      const userID = req.userID;
      const { plateID } = req.params;
      if (!userID)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      const plate = await prisma.plates.findUnique({ where: { id: String(plateID) } });
      if (!plate)
        throw newAppError("Prato n\xE3o encontrado", 404);
      const favorite = await prisma.favorites.findUnique({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID
          }
        }
      });
      if (favorite)
        throw newAppError("Prato j\xE1 favoritado", 404);
      await prisma.favorites.create({ data: { user_id: userID, plate_id: plateID } });
      return res.status(201).json("Prato listado em favoritos");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      if (error.code === "P2002")
        return res.status(400).json("Prato j\xE1 favoritado");
      return next(error);
    }
    ;
  },
  delete: async (req, res, next) => {
    try {
      const userID = req.userID;
      const { plateID } = req.params;
      if (!userID)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      const plate = await prisma.plates.findUnique({ where: { id: String(plateID) } });
      if (!plate)
        throw newAppError("Prato n\xE3o encontrado", 404);
      const favorite = await prisma.favorites.findUnique({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID
          }
        }
      });
      if (!favorite)
        throw newAppError("Favorito n\xE3o encontrado", 404);
      await prisma.favorites.delete({
        where: {
          user_id_plate_id: {
            user_id: userID,
            plate_id: plateID
          }
        }
      });
      return res.status(200).json("Prato removido dos favoritos");
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
  favoritesControllers
});
