import express from "express";
import HealthRoutes from "../modules/health/health.routes";

const app = express();

app.use(express.json());

app.use('/api/v1', HealthRoutes);

export default app;
