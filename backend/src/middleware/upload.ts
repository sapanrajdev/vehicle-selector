import multer, { FileFilterCallback } from "multer";
import { Request, RequestHandler } from "express";
import { AppError } from "./errorHandler";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(new AppError("Only text files are allowed", 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export const uploadSingle = (fieldName: string): RequestHandler =>
  upload.single(fieldName);
