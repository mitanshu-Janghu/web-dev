import express from "express";
import path from "path";
import { OUTPUTS_DIR, ensureSafeGeneratedFilename, fileExists } from "./utils.js";

const router = express.Router();

router.get("/:file", async (request, response) => {
  try {
    const fileName = request.params.file;
    ensureSafeGeneratedFilename(fileName);

    const filePath = path.join(OUTPUTS_DIR, fileName);

    if (!(await fileExists(filePath))) {
      response.status(404).json({ error: "File not found" });
      return;
    }

    response.download(filePath);
  } catch (error) {
    response.status(400).json({ error: error.message ?? "Invalid file request" });
  }
});

export default router;
