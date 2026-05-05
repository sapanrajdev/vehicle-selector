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
    try {
      // Validate vehicle data
      validateVehicleData(vehicleData);

      // Process logbook file
      const logbookContent = processLogbookFile(logbookFile);

      // Generate unique ID (in a real app, this would come from database)
      const id = generateSubmissionId();

      const response: VehicleSubmissionResponse = {
        vehicle: vehicleData,
        logbook: logbookContent,
        timestamp: new Date(),
        id,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
