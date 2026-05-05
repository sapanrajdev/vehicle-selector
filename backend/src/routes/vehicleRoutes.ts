import { Router } from "express";
import { VehicleController } from "../controllers/vehicleController";
import { uploadSingle } from "../middleware/upload";
import { asyncHandler } from "../middleware/asyncHandler";

const router: Router = Router();

/**
 * @route POST /api/vehicles/submit
 * @desc Submit vehicle selection with logbook
 * @access Public
 */
router.post(
  "/submit",
  uploadSingle("logbook"),
  asyncHandler(VehicleController.submitVehicle),
);

export default router;
