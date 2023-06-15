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

// src/controllers/userControllers.ts
var userControllers_exports = {};
__export(userControllers_exports, {
  userControllers: () => userControllers
});
module.exports = __toCommonJS(userControllers_exports);

// src/databases/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error"]
});

// src/controllers/userControllers.ts
var import_zod = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/excludeFields.ts
function excludeFields(model, keys) {
  for (let key of keys) {
    delete model[key];
  }
  ;
  return model;
}

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/controllers/userControllers.ts
var userControllers = {
  create: async (req, res, next) => {
    try {
      const userSchema = import_zod.z.object({
        name: import_zod.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        email: import_zod.z.string().email("Por favor insira um email v\xE1lido").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        password: import_zod.z.string().min(6, "Senha com m\xEDnimo de 6 car\xE1cteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
      }).strict();
      const { name, email, password } = userSchema.parse(req.body);
      const userEmail = await prisma.users.findUnique({ where: { email: String(email) } });
      if (userEmail)
        throw newAppError("Email j\xE1 cadastrado", 409);
      const passwordHash = await import_bcrypt.default.hash(password, 10);
      await prisma.users.create({ data: { name, email, password: passwordHash } });
      return res.status(201).json("Usu\xE1rio cadastrado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  index: async (req, res, next) => {
    try {
      const id = req.userID;
      if (!id)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
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
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  read: async (req, res, next) => {
    try {
      const id = req.userID;
      if (!id)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
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
              created_at: "desc"
            }
          }
        }
      });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      return res.status(200).json(excludeFields(user, ["password", "is_admin"]));
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
        name: import_zod.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        email: import_zod.z.string().email("Por favor insira um email v\xE1lido").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        password: import_zod.z.string().min(6, "Senha com m\xEDnimo de 6 car\xE1cteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
      }).strict();
      const id = req.userID;
      const { name, email, password } = userSchema.parse(req.body);
      const user = await prisma.users.findUnique({ where: { id: String(id) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      const userEmail = await prisma.users.findUnique({ where: { email: String(email) } });
      if (userEmail && user.email != userEmail.email) {
        throw newAppError("Email j\xE1 cadastrado", 409);
      }
      ;
      const passwordHash = await import_bcrypt.default.hash(password, 10);
      await prisma.users.update({
        data: { name, email, password: passwordHash },
        where: { id: String(id) }
      });
      return res.status(200).json("Usu\xE1rio atualizado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  delete: async (req, res, next) => {
    try {
      const id = req.userID;
      if (!id)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const user = await prisma.users.findUnique({ where: { id: String(id) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      await prisma.users.delete({ where: { id: String(id) } });
      return res.status(200).json("Usu\xE1rio deletado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userControllers
});
