"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/favoritesRoutes.ts
var favoritesRoutes_exports = {};
__export(favoritesRoutes_exports, {
  favoritesRoutes: () => favoritesRoutes
});
module.exports = __toCommonJS(favoritesRoutes_exports);
var import_express = require("express");

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

// src/middlewares/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/configs/auth.ts
var auth = {
  secret: process.env.SECRET_TOKEN,
  expiresIn: process.env.EXPIRESIN_TOKEN
};

// src/middlewares/auth.ts
function authMiddleware(req, res, next) {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken)
      throw newAppError("Por favor informar token", 401);
    const token = headerToken.split(" ");
    if (token.length != 2)
      throw newAppError("Token inv\xE1lido", 401);
    if (!/^Bearer$/i.test(token[0]))
      throw newAppError("Token inv\xE1lido", 401);
    import_jsonwebtoken.default.verify(token[1], String(auth.secret), (error, decoded) => {
      if (error)
        throw newAppError("Token inv\xE1lido", 401);
      req.userID = decoded.id;
      return next();
    });
  } catch (error) {
    return next(error);
  }
  ;
}

// src/routes/favoritesRoutes.ts
var favoritesRoutes = (0, import_express.Router)();
favoritesRoutes.use(authMiddleware);
favoritesRoutes.post("/favorites/:plateID", favoritesControllers.create);
favoritesRoutes.delete("/favorites/:plateID", favoritesControllers.delete);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  favoritesRoutes
});
