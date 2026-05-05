import { Router } from "express";
import { VehicleController } from "../controllers/vehicleController";
import { uploadSingle } from "../middleware/upload";

const router: Router = Router();

/**
 * @route POST /api/vehicles/submit
 * @desc Submit vehicle selection with logbook
 * @access Public
 */
router.post(
  "/submit",
  uploadSingle("logbook"),
  VehicleController.submitVehicle,
);

export default router;
