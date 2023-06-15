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

// src/controllers/authControllers.ts
var authControllers_exports = {};
__export(authControllers_exports, {
  authControllers: () => authControllers
});
module.exports = __toCommonJS(authControllers_exports);

// src/databases/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error"]
});

// src/controllers/authControllers.ts
var import_zod = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/configs/auth.ts
var auth = {
  secret: process.env.SECRET_TOKEN,
  expiresIn: process.env.EXPIRESIN_TOKEN
};

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/controllers/authControllers.ts
var authControllers = {
  login: async (req, res, next) => {
    try {
      const userSchema = import_zod.z.object({
        email: import_zod.z.string().email("Por favor insira um email v\xE1lido").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        password: import_zod.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
      }).strict();
      const { email, password } = userSchema.parse(req.body);
      const user = await prisma.users.findUnique({ where: { email: String(email) } });
      if (!user)
        throw newAppError("Email ou Senha inv\xE1lida", 401);
      const passwordMatch = await import_bcrypt.default.compare(password, user.password);
      if (!passwordMatch)
        throw newAppError("Email ou Senha inv\xE1lida", 401);
      const token = import_jsonwebtoken.default.sign(
        {
          id: String(user.id),
          isAdmin: user.is_admin
        },
        String(auth.secret),
        { expiresIn: String(auth.expiresIn) }
      );
      return res.status(200).json({ token });
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
  authControllers
});
