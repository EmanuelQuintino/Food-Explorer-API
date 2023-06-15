"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express_async_errors = require("express-async-errors");
var import_express7 = __toESM(require("express"));

// src/routes/index.ts
var import_express6 = require("express");

// src/routes/authRoutes.ts
var import_express = require("express");

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

// src/routes/authRoutes.ts
var authRoutes = (0, import_express.Router)();
authRoutes.post("/login", authControllers.login);

// src/routes/userRoutes.ts
var import_express2 = require("express");

// src/controllers/userControllers.ts
var import_zod2 = require("zod");
var import_bcrypt2 = __toESM(require("bcrypt"));

// src/utils/excludeFields.ts
function excludeFields(model, keys) {
  for (let key of keys) {
    delete model[key];
  }
  ;
  return model;
}

// src/controllers/userControllers.ts
var userControllers = {
  create: async (req, res, next) => {
    try {
      const userSchema = import_zod2.z.object({
        name: import_zod2.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        email: import_zod2.z.string().email("Por favor insira um email v\xE1lido").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        password: import_zod2.z.string().min(6, "Senha com m\xEDnimo de 6 car\xE1cteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
      }).strict();
      const { name, email, password } = userSchema.parse(req.body);
      const userEmail = await prisma.users.findUnique({ where: { email: String(email) } });
      if (userEmail)
        throw newAppError("Email j\xE1 cadastrado", 409);
      const passwordHash = await import_bcrypt2.default.hash(password, 10);
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
      const userSchema = import_zod2.z.object({
        name: import_zod2.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        email: import_zod2.z.string().email("Por favor insira um email v\xE1lido").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        password: import_zod2.z.string().min(6, "Senha com m\xEDnimo de 6 car\xE1cteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
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
      const passwordHash = await import_bcrypt2.default.hash(password, 10);
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

// src/middlewares/auth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
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
    import_jsonwebtoken2.default.verify(token[1], String(auth.secret), (error, decoded) => {
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

// src/routes/userRoutes.ts
var userRoutes = (0, import_express2.Router)();
userRoutes.post("/users", userControllers.create);
userRoutes.use(authMiddleware);
userRoutes.get("/users/index", isAdmin, userControllers.index);
userRoutes.get("/users", userControllers.read);
userRoutes.put("/users", userControllers.update);
userRoutes.delete("/users", userControllers.delete);

// src/routes/plateRoutes.ts
var import_express3 = require("express");

// src/controllers/plateControllers.ts
var import_zod3 = require("zod");

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
      const plateSchema = import_zod3.z.object({
        name: import_zod3.z.string().nonempty("O nome \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        description: import_zod3.z.string().nonempty("A descri\xE7\xE3o \xE9 obrigat\xF3ria").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        price: import_zod3.z.string().nonempty("O pre\xE7o \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        category: import_zod3.z.string().refine((value) => ["Refei\xE7\xF5es", "Sobremesas", "Bebidas"].includes(value), {
          message: 'A categoria deve ser preenchida com "Refei\xE7\xF5es", "Sobremesas" ou "Bebidas"'
        }),
        ingredients: import_zod3.z.string().nonempty("Pelo menos um ingrediente \xE9 obrigat\xF3rio").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres")
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
      const plateSchema = import_zod3.z.object({
        name: import_zod3.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        description: import_zod3.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        price: import_zod3.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        category: import_zod3.z.string().refine((value) => ["Refei\xE7\xF5es", "Sobremesas", "Bebidas"].includes(value), {
          message: 'A categoria deve ser preenchida com "Refei\xE7\xF5es", "Sobremesas" ou "Bebidas"'
        }),
        ingredients: import_zod3.z.string().max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
        image: import_zod3.z.string().optional()
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

// src/routes/plateRoutes.ts
var import_multer2 = __toESM(require("multer"));
var plateRoutes = (0, import_express3.Router)();
var upload = (0, import_multer2.default)(MULTER);
plateRoutes.get("/plates", authMiddleware, plateControllers.read);
plateRoutes.use(authMiddleware, isAdmin);
plateRoutes.post("/plates", upload.single("image"), plateControllers.create);
plateRoutes.put("/plates/:id", upload.single("image"), plateControllers.update);
plateRoutes.delete("/plates/:id", plateControllers.delete);
plateRoutes.patch("/plates/image/:id", upload.single("image"), plateControllers.patch);

// src/routes/orderRoutes.ts
var import_express4 = require("express");

// src/controllers/orderControllers.ts
var import_zod4 = require("zod");
var orderControllers = {
  create: async (req, res, next) => {
    try {
      const plateSchema = import_zod4.z.array(
        import_zod4.z.object({
          plateID: import_zod4.z.string().min(3, "Nome com m\xEDnimo de 3 caracteres").max(255, "Campo com tamanho m\xE1ximo de 255 caracteres"),
          amount: import_zod4.z.number().positive("A quantidade deve ser um n\xFAmero positivo").max(99, "O valor m\xE1ximo permitido \xE9 99")
        }).strict()
      );
      const orders = plateSchema.parse(req.body);
      const userID = req.userID;
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      const platesID = orders.map((order) => order.plateID);
      const plates = await prisma.plates.findMany({
        where: {
          id: {
            in: platesID
          }
        }
      });
      const existingPlateIDs = plates.map((plate) => plate.id);
      const missingPlates = platesID.filter((plateID) => !existingPlateIDs.includes(plateID));
      if (missingPlates.length > 0)
        throw newAppError(`Pratos n\xE3o localizados: ${missingPlates.join(", ")}`, 404);
      const orderData = orders.map((order) => {
        const plateMatch = plates.find((plate) => plate.id === order.plateID);
        return {
          plateID: order.plateID,
          amount: order.amount,
          price: Number(plateMatch?.price)
        };
      });
      const maxCodeOrder = await prisma.orders.findFirst({
        select: {
          code: true
        },
        orderBy: {
          code: "desc"
        }
      });
      const nextCode = maxCodeOrder ? maxCodeOrder.code + 1 : 1;
      await prisma.orders.create({
        data: {
          user_id: userID,
          code: nextCode,
          order_plates: {
            create: orderData.map((order) => ({
              plate_id: order.plateID,
              amount: order.amount,
              price: order.price
            }))
          }
        }
      });
      return res.status(201).json("Pedido realizado com sucesso");
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      if (error.code === "P2003")
        return res.status(404).json({ error: "Prato n\xE3o encontrado" });
      return next(error);
    }
    ;
  },
  index: async (req, res, next) => {
    try {
      const id = req.userID;
      if (!id)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const { search } = req.query;
      if (search) {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: "desc" },
          where: {
            OR: [
              { code: { equals: Number(search) || void 0 } },
              { status: { contains: String(search) || void 0 } }
            ]
          }
        });
        return res.status(200).json(orders);
      } else {
        const orders = await prisma.orders.findMany({
          include: { order_plates: true },
          orderBy: { code: "desc" },
          take: 30
        });
        return res.status(200).json(orders);
      }
      ;
    } catch (error) {
      if (error.code === "P2021")
        return res.status(500).json("Tabela n\xE3o encontrada");
      return next(error);
    }
    ;
  },
  read: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { search } = req.query;
      const userID = req.userID;
      if (!userID)
        throw newAppError("Por favor inserir o ID do usu\xE1rio", 400);
      const user = await prisma.users.findUnique({ where: { id: String(userID) } });
      if (!user)
        throw newAppError("Usu\xE1rio n\xE3o encontrado", 404);
      if (id) {
        const order = await prisma.orders.findUnique({
          where: { id: String(id) },
          include: { order_plates: true }
        });
        if (!order)
          throw newAppError("Pedido n\xE3o encontrado", 404);
        if (order?.user_id != userID)
          throw newAppError("Sem autoriza\xE7\xE3o para acessar este pedido", 401);
        return res.status(200).json(order);
      } else {
        if (search) {
          const orders = await prisma.orders.findMany({
            include: { order_plates: true },
            orderBy: { code: "desc" },
            where: {
              user_id: userID,
              OR: [
                { code: { equals: Number(search) || void 0 } },
                { status: { contains: String(search) || void 0 } }
              ]
            }
          });
          return res.status(200).json(orders);
        } else {
          const orders = await prisma.orders.findMany({
            where: { user_id: userID },
            include: { order_plates: true },
            orderBy: { code: "desc" },
            take: 30
          });
          return res.status(200).json(orders);
        }
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
      const userSchema = import_zod4.z.object({
        status: import_zod4.z.string().refine((value) => ["Pendente", "Preparando", "Entregue"].includes(value), {
          message: 'O status deve ser preenchido com "Pendente", "Preparando" ou "Entregue"'
        })
      }).strict();
      const { id } = req.params;
      const { status } = userSchema.parse(req.body);
      if (!id)
        throw newAppError("Por favor inserir o ID do pedido", 400);
      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order)
        throw newAppError("Pedido n\xE3o encontrado", 404);
      await prisma.orders.update({
        data: { status },
        where: { id: String(id) }
      });
      return res.status(200).json(`Status do pedido atualizado para '${status}'`);
    } catch (error) {
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
        throw newAppError("Por favor inserir o ID do pedido", 400);
      const order = await prisma.orders.findUnique({ where: { id: String(id) } });
      if (!order)
        throw newAppError("Pedido n\xE3o encontrado", 404);
      await prisma.orders.delete({ where: { id: String(id) } });
      return res.status(200).json("Pedido deletado com sucesso");
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

// src/routes/orderRoutes.ts
var orderRoutes = (0, import_express4.Router)();
orderRoutes.use(authMiddleware);
orderRoutes.post("/orders", orderControllers.create);
orderRoutes.get("/orders", orderControllers.read);
orderRoutes.get("/orders/index", isAdmin, orderControllers.index);
orderRoutes.put("/orders/:id", isAdmin, orderControllers.update);
orderRoutes.delete("/orders/:id", isAdmin, orderControllers.delete);

// src/routes/favoritesRoutes.ts
var import_express5 = require("express");

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

// src/routes/favoritesRoutes.ts
var favoritesRoutes = (0, import_express5.Router)();
favoritesRoutes.use(authMiddleware);
favoritesRoutes.post("/favorites/:plateID", favoritesControllers.create);
favoritesRoutes.delete("/favorites/:plateID", favoritesControllers.delete);

// src/routes/index.ts
var routes = (0, import_express6.Router)();
routes.use(authRoutes);
routes.use(userRoutes);
routes.use(orderRoutes);
routes.use(favoritesRoutes);
routes.use(plateRoutes);

// src/errors/pageNotFound.ts
function pageNotFoundError(req, res, next) {
  const error = newAppError("Page not found", 404);
  next(error);
}

// src/errors/appError.ts
var import_zod5 = require("zod");
function appError(error, req, res, next) {
  console.error(error);
  if (error instanceof import_zod5.ZodError) {
    return res.status(error.status || 500).json({ error: JSON.parse(error.message)[0].message });
  }
  ;
  return res.status(error.status || 500).json({ error: error.message });
}

// src/server.ts
var import_dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));
var app = (0, import_express7.default)();
app.listen(3e3, () => console.log("Server is running on port 3000"));
app.use(import_express7.default.json());
app.use((0, import_cors.default)());
app.use("/images", import_express7.default.static(UPLOADS_FOLDER));
app.use(routes);
import_dotenv.default.config();
app.use(pageNotFoundError);
app.use(appError);
prisma.$connect().then(() => console.log("Database is connected...")).catch((error) => console.error(error));
