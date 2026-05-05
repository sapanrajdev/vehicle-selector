import { Router } from "express";
import vehicleRoutes from "./vehicleRoutes";
import { VehicleController } from "../controllers/vehicleController";

const router: Router = Router();

// Health check route
router.get("/health", VehicleController.healthCheck);

// API routes
router.use("/vehicles", vehicleRoutes);

export default router;
