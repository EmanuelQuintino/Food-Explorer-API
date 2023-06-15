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

// src/middlewares/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authMiddleware: () => authMiddleware
});
module.exports = __toCommonJS(auth_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMiddleware
});
