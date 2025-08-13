import cors, { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "https://example.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
