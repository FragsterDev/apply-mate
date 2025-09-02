import express from "express";

import cors from "cors";
import { apiRateLimiter } from "../utils/rateLimiter";
import morgan from "morgan";

import { BASE_ROUTE } from "../utils/constants/routes.constants";
import { error } from "../utils/responses/responses";
import errorMiddleware from "./middlewares/error.middleware";
import HealthRoutes from "../modules/health/health.routes";
import UserRoutes from "../modules/users/routes/users.routes";
import AuthRoutes from "../modules/auth/routes/auth.routes";
import JobRoutees from "../modules/job/routes/job.routes";

const app = express();

//logging with morgan
app.use(morgan("dev"));

// default cors - allows all cross origins
app.use(cors());

//apply rate limiter globally
app.use(apiRateLimiter);

//parse json payloads
app.use(express.json());

//adding all the routes like /api/v1/...
app.use(BASE_ROUTE, HealthRoutes);
app.use(BASE_ROUTE, UserRoutes);
app.use(BASE_ROUTE, AuthRoutes);
app.use(BASE_ROUTE, JobRoutees);

//fallback route 404 error
app.use((req, res, next) => {
  res.status(404).json(error(404, "Route Not Found"));
});

//error handling middleware
app.use(errorMiddleware);

export default app;
