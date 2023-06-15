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

// src/errors/appError.ts
var appError_exports = {};
__export(appError_exports, {
  appError: () => appError
});
module.exports = __toCommonJS(appError_exports);
var import_zod = require("zod");
function appError(error, req, res, next) {
  console.error(error);
  if (error instanceof import_zod.ZodError) {
    return res.status(error.status || 500).json({ error: JSON.parse(error.message)[0].message });
  }
  ;
  return res.status(error.status || 500).json({ error: error.message });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appError
});
