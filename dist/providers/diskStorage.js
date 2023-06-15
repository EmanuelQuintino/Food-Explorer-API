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

// src/providers/diskStorage.ts
var diskStorage_exports = {};
__export(diskStorage_exports, {
  diskStorage: () => diskStorage
});
module.exports = __toCommonJS(diskStorage_exports);
var import_fs = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));

// src/configs/upload.ts
var import_path = __toESM(require("path"));
var import_multer = __toESM(require("multer"));
var TMP_FOLDER = import_path.default.resolve(__dirname, "..", "..", "tmp");
var UPLOADS_FOLDER = import_path.default.resolve(TMP_FOLDER, "uploads");
var MULTER = {
  storage: import_multer.default.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileName = `${(/* @__PURE__ */ new Date()).getTime()}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};

// src/providers/diskStorage.ts
var diskStorage = {
  saveFile: async (file) => {
    try {
      await import_fs.default.promises.rename(
        import_path2.default.resolve(TMP_FOLDER, file),
        import_path2.default.resolve(UPLOADS_FOLDER, file)
      );
      return file;
    } catch (error) {
      return;
    }
    ;
  },
  deleteFile: async (file) => {
    try {
      const filePath = import_path2.default.resolve(UPLOADS_FOLDER, file);
      await import_fs.default.promises.stat(filePath);
      await import_fs.default.promises.unlink(filePath);
    } catch (error) {
      return;
    }
    ;
  },
  deleteTempFile: async (file) => {
    try {
      const filePath = import_path2.default.resolve(TMP_FOLDER, file);
      await import_fs.default.promises.stat(filePath);
      await import_fs.default.promises.unlink(filePath);
    } catch (error) {
      return;
    }
    ;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  diskStorage
});
