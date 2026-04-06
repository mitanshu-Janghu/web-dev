import rateLimit from "express-rate-limit";

export function createDailyLimiter(message) {
  return rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: message,
    },
  });
}
