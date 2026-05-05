import {
  VehicleSubmission,
  VehicleSubmissionResponse,
  LogbookFile,
} from "../types";
import {
  generateSubmissionId,
  processLogbookFile,
  validateVehicleData,
} from "../utils/vehicle";

export class VehicleService {
  /**
   * Process vehicle submission with logbook
   */
  static async processVehicleSubmission(
    vehicleData: VehicleSubmission,
    logbookFile: LogbookFile,
  ): Promise<VehicleSubmissionResponse> {
    // Validate vehicle data
    validateVehicleData(vehicleData);

    // Process logbook file
    const logbookContent = processLogbookFile(logbookFile);

    // Generate unique ID
    const id = generateSubmissionId();

    return {
      vehicle: vehicleData,
      logbook: logbookContent,
      timestamp: new Date(),
      id,
    };
  }
}
