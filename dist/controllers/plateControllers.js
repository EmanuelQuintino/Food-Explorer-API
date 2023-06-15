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

// src/controllers/plateControllers.ts
var plateControllers_exports = {};
__export(plateControllers_exports, {
  plateControllers: () => plateControllers
});
module.exports = __toCommonJS(plateControllers_exports);

// src/databases/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error"]
});

// src/controllers/plateControllers.ts
var import_zod = require("zod");

// src/utils/newAppError.ts
function newAppError(message, status) {
  return {
    message,
    status
  };
}

// src/providers/diskStorage.ts
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

// src/controllers/plateControllers.ts
var plateControllers = {
  create: async (req, res, next) => {
    try {
      const plateSchema = import_zod.z.object({
        name: import_zod.z.string().nonempty("O nome \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        description: import_zod.z.string().nonempty("A descri\xE7\xE3o \xE9 obrigat\xF3ria").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        price: import_zod.z.string().nonempty("O pre\xE7o \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        category: import_zod.z.string().refine((value) => ["Refei\xE7\xF5es", "Sobremesas", "Bebidas"].includes(value), {
          message: 'A categoria deve ser preenchida com "Refei\xE7\xF5es", "Sobremesas" ou "Bebidas"'
        }),
        ingredients: import_zod.z.string().nonempty("Pelo menos um ingrediente \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
      }).strict();
      const { name, description, price, category, ingredients } = plateSchema.parse(req.body);
      const plate = await prisma.plates.findFirst({ where: { name: String(name) } });
      if (plate)
        throw newAppError("Nome j\xE1 cadastrado", 409);
      const arrayIngredients = JSON.parse(ingredients);
      if (arrayIngredients.length == 0)
        throw newAppError("Por favor inserir ingredientes", 400);
      const imageFile = req.file;
      if (!imageFile)
        throw newAppError("Por favor inserir imagem", 400);
      const isImage = ["image/png", "image/jpg", "image/jpeg"].find((type) => type === imageFile?.mimetype);
      if (!isImage)
        throw newAppError("Somente arquivos PNG e JPG s\xE3o permitidos!", 400);
      await diskStorage.saveFile(imageFile.filename);
      await prisma.plates.create({
        data: {
          name,
          description,
          price: Number(price.replace(",", ".")),
          category,
          image: imageFile.filename,
          ingredients: {
            create: arrayIngredients.map((ingredient) => ({ name: ingredient }))
          }
        }
      });
      return res.status(201).json("Prato cadastrado com sucesso");
    } catch (error) {
      await diskStorage.deleteTempFile(req.file?.filename);
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  read: async (req, res, next) => {
    try {
      const { id } = req.query;
      if (id) {
        const plate = await prisma.plates.findUnique({
          where: { id: String(id) },
          include: { ingredients: true }
        });
        if (!plate)
          throw newAppError("Prato n\xE3o encontrado", 404);
        return res.status(200).json(plate);
      } else {
        const plates = await prisma.plates.findMany({
          include: { ingredients: true },
          orderBy: { created_at: "asc" }
        });
        return res.status(200).json(plates);
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
      const plateSchema = import_zod.z.object({
        name: import_zod.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        description: import_zod.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        price: import_zod.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        category: import_zod.z.string().refine((value) => ["Refei\xE7\xF5es", "Sobremesas", "Bebidas"].includes(value), {
          message: 'A categoria deve ser preenchida com "Refei\xE7\xF5es", "Sobremesas" ou "Bebidas"'
        }),
        ingredients: import_zod.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        image: import_zod.z.string().optional()
      }).strict();
      const { name, description, price, category, ingredients } = plateSchema.parse(req.body);
      const { id } = req.params;
      if (!id)
        throw newAppError("Por favor inserir o ID do Prato", 400);
      const plate = await prisma.plates.findUnique({ where: { id: String(id) } });
      if (!plate)
        throw newAppError("Prato n\xE3o encontrado", 404);
      const plateName = await prisma.plates.findFirst({ where: { name: String(name) } });
      if (plateName && plateName.name != plate.name)
        throw newAppError("Nome j\xE1 cadastrado", 409);
      const arrayIngredients = JSON.parse(ingredients);
      if (arrayIngredients.length == 0)
        throw newAppError("Por favor inserir ingredientes", 400);
      const imageFile = req.file;
      if (imageFile) {
        const isImage = ["image/png", "image/jpg", "image/jpeg"].find((type) => type === imageFile?.mimetype);
        if (!isImage)
          throw newAppError("Somente arquivos PNG e JPG s\xE3o permitidos!", 400);
      }
      ;
      const imageFileName = imageFile?.filename;
      if (imageFileName) {
        await diskStorage.deleteFile(plate.image);
        await diskStorage.saveFile(imageFileName);
      }
      ;
      await prisma.plates.update({
        data: {
          ...name !== "" && { name },
          ...description !== "" && { description },
          ...price !== "" && { price: parseFloat(price.replace(",", ".")) },
          ...category !== "" && { category },
          ...imageFileName && { image: imageFileName },
          ingredients: {
            deleteMany: { plate_id: String(id) },
            create: arrayIngredients.map((ingredient) => ({ name: ingredient }))
          }
        },
        where: { id: String(id) }
      });
      return res.status(200).json("Prato atualizado com sucesso");
    } catch (error) {
      await diskStorage.deleteTempFile(req.file?.filename);
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
        throw newAppError("Por favor inserir o ID do Prato", 400);
      const plate = await prisma.plates.findUnique({ where: { id: String(id) } });
      if (!plate)
        throw newAppError("Prato n\xE3o encontrado", 404);
      if (plate.image)
        await diskStorage.deleteFile(plate.image);
      await prisma.plates.delete({ where: { id: String(id) } });
      return res.status(200).json("Prato deletado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  patch: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id)
        throw newAppError("Por favor inserir o ID do Prato", 400);
      const imageFile = req.file;
      if (!imageFile)
        throw newAppError("Por favor inserir imagem", 400);
      const isImage = ["image/png", "image/jpg", "image/jpeg"].find((type) => type === imageFile?.mimetype);
      if (!isImage)
        throw newAppError("Somente arquivos PNG e JPG s\xE3o permitidos!", 400);
      const imageFileName = imageFile.filename;
      const plate = await prisma.plates.findUnique({ where: { id: String(id) } });
      if (!plate)
        throw newAppError("Prato n\xE3o encontrado", 404);
      if (plate.image)
        await diskStorage.deleteFile(plate.image);
      await diskStorage.saveFile(imageFileName);
      await prisma.plates.update({
        data: { image: imageFileName },
        where: { id: String(id) }
      });
      return res.status(200).json("Upload de imagem com sucesso");
    } catch (error) {
      await diskStorage.deleteTempFile(req.file?.filename);
      return next(error);
    }
    ;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  plateControllers
});
