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

// src/middlewares/isAdmin.ts
var isAdmin_exports = {};
__export(isAdmin_exports, {
  isAdmin: () => isAdmin
});
module.exports = __toCommonJS(isAdmin_exports);

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

// src/middlewares/isAdmin.ts
async function isAdmin(req, res, next) {
  try {
    const id = req.userID;
    const user = await prisma.users.findUnique({ where: { id: String(id) } });
    if (!user)
      throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
    if (!user.is_admin)
      throw newAppError("Usu\xE1rio n\xE3o autorizado", 401);
    return next();
  } catch (error) {
    return next(error);
  }
  ;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isAdmin
});
