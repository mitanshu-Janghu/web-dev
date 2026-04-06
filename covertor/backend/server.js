import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import uploadRoutes from "./routes/uploadRoutes.js";
import conversionRoutes from "./routes/conversionRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import { ensureRuntimeDirectories } from "./routes/utils.js";
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");

app.use((request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (request.path.startsWith("/download/")) {
    response.setHeader("Cache-Control", "private, max-age=600");
  } else {
    response.setHeader("Cache-Control", "no-store");
  }

  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
  }),
);
app.use(express.json());
app.use(morgan("tiny"));

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "File Converter Pro API",
    time: new Date().toISOString(),
  });
});

app.use("/upload", uploadRoutes);
app.use("/convert", conversionRoutes);
app.use("/download", downloadRoutes);

app.use((error, _request, response, _next) => {
  const statusCode = error.statusCode ?? 500;
  response.status(statusCode).json({
    error: error.message ?? "Unexpected server error",
  });
});

const port = Number(process.env.PORT ?? 5000);

await ensureRuntimeDirectories();

app.listen(port, () => {
  console.log(`File Converter Pro backend running on http://localhost:${port}`);
});
