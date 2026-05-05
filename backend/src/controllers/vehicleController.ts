import { Request, Response } from "express";
import { VehicleService } from "../services/vehicleService";
import {
  VehicleSubmission,
  ApiResponse,
  VehicleSubmissionResponse,
  HealthCheckResponse,
} from "../types";
import { asyncHandler } from "../middleware/errorHandler";

export class VehicleController {
  /**
   * Handle vehicle submission with logbook upload
   */
  static submitVehicle = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      console.log(
        "[vehicleController.submitVehicle] Received request with body:",
        req.body,
      );
      const { make, model, badge } = req.body as VehicleSubmission;
      const logbookFile = req.file;

      if (!logbookFile) {
        const response: ApiResponse<unknown> = {
          success: false,
          error: "Logbook file is required",
        };
        console.error(
          "[vehicleController.submitVehicle] No logbook file provided",
        );
        res.status(400).json(response);
        return;
      }

      const vehicleData: VehicleSubmission = { make, model, badge };
      const result = await VehicleService.processVehicleSubmission(
        vehicleData,
        logbookFile,
      );

      const response: ApiResponse<VehicleSubmissionResponse> = {
        success: true,
        data: result,
        message: "Vehicle submission processed successfully",
      };
      console.log(
        "[vehicleController.submitVehicle] Successfully processed submission:",
        result,
      );
      res.status(200).json(response);
    },
  );

  /**
   * Health check endpoint
   */
  static healthCheck = (_req: Request, res: Response): void => {
    const response: ApiResponse<HealthCheckResponse> = {
      success: true,
      message: "Vehicle Selection API is healthy",
      data: {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
    };

    res.status(200).json(response);
  };
}
