import { VehicleService } from "../../src/services/vehicleService";
import { VehicleSubmission } from "../../src/types";
import { AppError } from "../../src/middleware/errorHandler";

describe("VehicleService", () => {
  describe("processVehicleSubmission", () => {
    const validVehicleData: VehicleSubmission = {
      make: "Toyota",
      model: "Camry",
      badge: "LE",
    };

    const mockLogbookFile = {
      fieldname: "logbook",
      originalname: "logbook.txt",
      encoding: "7bit",
      mimetype: "text/plain",
      buffer: Buffer.from("Sample logbook content"),
      size: 23,
    };

    it("should process valid vehicle submission successfully", async () => {
      const result = await VehicleService.processVehicleSubmission(
        validVehicleData,
        mockLogbookFile as any,
      );

      expect(result).toHaveProperty("id");
      expect(result.vehicle).toEqual(validVehicleData);
      expect(result.logbook).toBe("Sample logbook content");
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it("should throw error for missing model", async () => {
      const invalidData = { ...validVehicleData, model: "" };

      await expect(
        VehicleService.processVehicleSubmission(
          invalidData,
          mockLogbookFile as any,
        ),
      ).rejects.toThrow(AppError);
    });

    it("should throw error for missing badge", async () => {
      const invalidData = { ...validVehicleData, badge: "" };

      await expect(
        VehicleService.processVehicleSubmission(
          invalidData,
          mockLogbookFile as any,
        ),
      ).rejects.toThrow(AppError);
    });

    it("should throw error for empty logbook content", async () => {
      const emptyContentFile = {
        ...mockLogbookFile,
        buffer: Buffer.from(""),
        size: 0,
      };

      await expect(
        VehicleService.processVehicleSubmission(
          validVehicleData,
          emptyContentFile as any,
        ),
      ).rejects.toThrow(AppError);
    });
  });
});
