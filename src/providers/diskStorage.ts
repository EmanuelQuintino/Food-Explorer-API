import fs from "fs";
import path from "path";
import { TMP_FOLDER, UPLOADS_FOLDER } from "../configs/upload";

export const diskStorage = {
  saveFile: async (file: string) => {
    try {
      await fs.promises.rename(
        path.resolve(TMP_FOLDER, file),
        path.resolve(UPLOADS_FOLDER, file),
      );
      return file;
    } catch (error) {
      return;
    };
  },

  deleteFile: async (file: string) => {
    try {
      const filePath = path.resolve(UPLOADS_FOLDER, file);
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch (error) {
      return;
    };
  },

  deleteTempFile: async (file: string) => {
    try {
      const filePath = path.resolve(TMP_FOLDER, file);
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch (error) {
      return;
    };
  },
};