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

// src/errors/pageNotFound.ts
var pageNotFound_exports = {};
__export(pageNotFound_exports, {
  pageNotFoundError: () => pageNotFoundError
});
module.exports = __toCommonJS(pageNotFound_exports);

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/errors/pageNotFound.ts
function pageNotFoundError(req, res, next) {
  const error = newAppError("Page not found", 404);
  next(error);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pageNotFoundError
});
