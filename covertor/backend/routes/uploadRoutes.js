import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import { createDailyLimiter } from "./limiters.js";
import {
  MAX_FILE_SIZE_BYTES,
  TOOL_CONFIG,
  UPLOADS_DIR,
  assertToolKey,
  ensureSafeGeneratedFilename,
  scheduleCleanup,
} from "./utils.js";

const router = express.Router();

const uploadLimiter = createDailyLimiter("Daily upload limit reached. Try again tomorrow.");

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, UPLOADS_DIR);
  },
  filename: (request, file, callback) => {
    try {
      const tool = assertToolKey(request.body.tool);
      const extension = path.extname(file.originalname).toLowerCase();
      const safeName = `${uuid()}${extension}`;

      if (!TOOL_CONFIG[tool].extensions.includes(extension)) {
        callback(new Error(`Unsupported file extension: ${extension}`));
        return;
      }

      callback(null, safeName);
    } catch (error) {
      callback(error);
    }
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
  fileFilter: (request, file, callback) => {
    try {
      const tool = assertToolKey(request.body.tool);
      const extension = path.extname(file.originalname).toLowerCase();
      const config = TOOL_CONFIG[tool];

      if (
        !config.extensions.includes(extension) ||
        (config.mimeTypes.length > 0 && !config.mimeTypes.includes(file.mimetype))
      ) {
        callback(new Error(`Unsupported file type for ${tool}`));
        return;
      }

      callback(null, true);
    } catch (error) {
      callback(error);
    }
  },
});

router.post("/", uploadLimiter, upload.single("file"), (request, response) => {
  if (!request.file) {
    response.status(400).json({ error: "No file uploaded" });
    return;
  }

  ensureSafeGeneratedFilename(request.file.filename);
  scheduleCleanup(request.file.path);

  response.status(201).json({
    message: "Upload complete",
    file: {
      storedName: request.file.filename,
      originalName: request.file.originalname,
      size: request.file.size,
    },
  });
});

export default router;
