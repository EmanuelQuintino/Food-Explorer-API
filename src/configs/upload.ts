import path from "path";
import multer from "multer";

export const TMP_FOLDER = path.resolve(__dirname, "..", "tmp");
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};