import express from "express";
import HealthRoutes from "../modules/health/health.routes";
import { error } from "../utils/responses/responses";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

const BASE_ROUTE = "/api/v1";

app.use(express.json());

app.use(BASE_ROUTE, HealthRoutes);

//fallback route 404 error
app.use((req, res, next) => {
  res.status(404).json(error(404, "Route Not Found"));
});

//error handling middleware
app.use(errorMiddleware);

export default app;
