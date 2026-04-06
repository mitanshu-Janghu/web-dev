import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, "..");

export const UPLOADS_DIR = path.join(backendDir, "uploads");
export const OUTPUTS_DIR = path.join(backendDir, "outputs");
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const CLEANUP_WINDOW_MS = 10 * 60 * 1000;
const safeFilenamePattern = /^[a-f0-9-]+\.[a-z0-9]+$/i;

const cleanupTimers = new Map();

export const TOOL_CONFIG = {
  "mp4-to-mp3": {
    label: "MP4 to MP3",
    binaryName: "FFmpeg",
    inputDir: UPLOADS_DIR,
    outputExtension: "mp3",
    extensions: [".mp4"],
    mimeTypes: ["video/mp4"],
  },
  "pdf-to-word": {
    label: "PDF to Word",
    binaryName: "LibreOffice",
    inputDir: UPLOADS_DIR,
    outputExtension: "docx",
    extensions: [".pdf"],
    mimeTypes: ["application/pdf"],
  },
  "image-to-pdf": {
    label: "Image to PDF",
    binaryName: "ImageMagick",
    inputDir: UPLOADS_DIR,
    outputExtension: "pdf",
    extensions: [".png", ".jpg", ".jpeg", ".webp"],
    mimeTypes: ["image/png", "image/jpeg", "image/webp"],
  },
};

export function assertToolKey(tool) {
  if (!tool || !Object.hasOwn(TOOL_CONFIG, tool)) {
    const error = new Error("Unsupported conversion tool");
    error.statusCode = 400;
    throw error;
  }

  return tool;
}

export function ensureSafeGeneratedFilename(fileName) {
  if (!safeFilenamePattern.test(fileName)) {
    const error = new Error("Invalid file name");
    error.statusCode = 400;
    throw error;
  }
}

export function buildPublicDownloadUrl(fileName) {
  return `/download/${encodeURIComponent(fileName)}`;
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureRuntimeDirectories() {
  await Promise.all([
    fs.mkdir(UPLOADS_DIR, { recursive: true }),
    fs.mkdir(OUTPUTS_DIR, { recursive: true }),
  ]);
}

export function scheduleCleanup(filePath) {
  if (cleanupTimers.has(filePath)) {
    clearTimeout(cleanupTimers.get(filePath));
  }

  const timer = setTimeout(async () => {
    await fs.unlink(filePath).catch(() => {});
    cleanupTimers.delete(filePath);
  }, CLEANUP_WINDOW_MS);

  cleanupTimers.set(filePath, timer);
}

export function getBinaryArgs(tool, inputPath, outputPath) {
  switch (tool) {
    case "mp4-to-mp3":
      return {
        command: process.env.FFMPEG_COMMAND ?? "ffmpeg",
        args: ["-y", "-i", inputPath, "-vn", outputPath],
      };
    case "pdf-to-word":
      return {
        command: process.env.LIBREOFFICE_COMMAND ?? "soffice",
        args: ["--headless", "--convert-to", "docx", "--outdir", OUTPUTS_DIR, inputPath],
      };
    case "image-to-pdf": {
      const preferredCommand =
        process.env.IMAGEMAGICK_COMMAND ??
        (process.platform === "win32" ? "magick" : "convert");

      return {
        command: preferredCommand,
        args:
          preferredCommand === "magick"
            ? ["convert", inputPath, outputPath]
            : [inputPath, outputPath],
      };
    }
    default:
      throw new Error("Unsupported conversion tool");
  }
}

export function runConversionCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: false,
    });

    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(new Error(`${command} failed to start: ${error.message}`));
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr.trim() || `${command} exited with code ${code}`));
    });
  });
}
