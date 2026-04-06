import express from "express";
import fs from "fs/promises";
import path from "path";
import { createDailyLimiter } from "./limiters.js";
import {
  OUTPUTS_DIR,
  TOOL_CONFIG,
  assertToolKey,
  buildPublicDownloadUrl,
  ensureSafeGeneratedFilename,
  fileExists,
  getBinaryArgs,
  runConversionCommand,
  scheduleCleanup,
} from "./utils.js";

const router = express.Router();
const conversionLimiter = createDailyLimiter(
  "Daily conversion limit reached. Upgrade your plan or try again tomorrow.",
);

async function handleConversion(request, response, tool) {
  const config = TOOL_CONFIG[tool];
  const inputFile = request.body?.fileName;

  if (!inputFile) {
    response.status(400).json({ error: "fileName is required" });
    return;
  }

  ensureSafeGeneratedFilename(inputFile);

  const inputPath = path.join(config.inputDir, inputFile);
  const inputExists = await fileExists(inputPath);

  if (!inputExists) {
    response.status(404).json({ error: "Uploaded file not found" });
    return;
  }

  const outputBase = inputFile.replace(path.extname(inputFile), "");
  const outputFileName = `${outputBase}.${config.outputExtension}`;
  const outputPath = path.join(OUTPUTS_DIR, outputFileName);
  const { command, args } = getBinaryArgs(tool, inputPath, outputPath);

  try {
    await runConversionCommand(command, args);

    if (!(await fileExists(outputPath))) {
      throw new Error("Conversion completed but the output file was not created.");
    }

    scheduleCleanup(outputPath);
    await fs.unlink(inputPath).catch(() => {});

    response.json({
      message: `${config.label} conversion complete`,
      file: {
        fileName: outputFileName,
        downloadUrl: buildPublicDownloadUrl(outputFileName),
      },
    });
  } catch (error) {
    const message =
      error.message ??
      `Failed to convert file. Make sure ${config.binaryName} is installed on the server.`;

    response.status(500).json({ error: message });
  }
}

router.post("/mp4-to-mp3", conversionLimiter, async (request, response) => {
  await handleConversion(request, response, assertToolKey("mp4-to-mp3"));
});

router.post("/pdf-to-word", conversionLimiter, async (request, response) => {
  await handleConversion(request, response, assertToolKey("pdf-to-word"));
});

router.post("/image-to-pdf", conversionLimiter, async (request, response) => {
  await handleConversion(request, response, assertToolKey("image-to-pdf"));
});

export default router;
