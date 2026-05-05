import { AppError } from "../middleware/errorHandler";
import { LogbookFile, VehicleSubmission } from "../types";

/**
 * Validate vehicle submission data
 */
export const validateVehicleData = (data: VehicleSubmission): void => {
  const { make, model, badge } = data;

  if (!make || !model || !badge) {
    throw new AppError("Make, model, and badge are required", 400);
  }

  // Additional validation logic can be added here
  // For example, checking against a database of valid vehicles
};

/**
 * Process and validate logbook file
 */
export const processLogbookFile = (file: LogbookFile): string => {
  if (!file) {
    throw new AppError("Logbook file is required", 400);
  }

  if (file.size === 0) {
    throw new AppError("Logbook file cannot be empty", 400);
  }

  try {
    const content = file.buffer.toString("utf8");

    // Basic content validation
    if (!content.trim()) {
      throw new AppError("Logbook file content cannot be empty", 400);
    }

    return content;
  } catch (error) {
    throw new AppError("Failed to process logbook file content", 400);
  }
};

/**
 * Generate unique submission ID
 */
export const generateSubmissionId = (): string => {
  return `vs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
