import { Request, Response } from "express";
import { VehicleController } from "../../src/controllers/vehicleController";
import { VehicleService } from "../../src/services/vehicleService";
import { AppError } from "../../src/middleware/errorHandler";

jest.mock("../../src/services/vehicleService");

describe("VehicleController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe("submitVehicle", () => {
    it("should submit vehicle successfully", async () => {
      const mockResult = {
        vehicle: { make: "Toyota", model: "Camry", badge: "LE" },
        logbook: "Sample logbook",
        timestamp: new Date(),
        id: "test-id",
      };

      (VehicleService.processVehicleSubmission as jest.Mock).mockResolvedValue(
        mockResult,
      );

      mockRequest = {
        body: { make: "Toyota", model: "Camry", badge: "LE" },
        file: { buffer: Buffer.from("Sample logbook") } as any,
      };

      await VehicleController.submitVehicle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(VehicleService.processVehicleSubmission).toHaveBeenCalledWith(
        { make: "Toyota", model: "Camry", badge: "LE" },
        mockRequest.file,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockResult,
        message: "Vehicle submission processed successfully",
      });
    });

    it("should return 400 if no logbook file", async () => {
      mockRequest = {
        body: { make: "Toyota", model: "Camry", badge: "LE" },
        file: undefined as any,
      };

      await VehicleController.submitVehicle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: "Logbook file is required",
      });
    });

    const flushPromises = () => new Promise(setImmediate);

    it("should handle service errors", async () => {
      (VehicleService.processVehicleSubmission as jest.Mock).mockRejectedValue(
        new AppError("Service error", 400),
      );

      mockRequest = {
        body: { make: "Toyota", model: "Camry", badge: "LE" },
        file: { buffer: Buffer.from("Sample logbook") } as any,
      };

      VehicleController.submitVehicle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      await flushPromises();

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Service error",
          statusCode: 400,
        }),
      );
    });
  });

  describe("healthCheck", () => {
    it("should return health status", () => {
      VehicleController.healthCheck(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Vehicle Selection API is healthy",
        data: {
          timestamp: expect.any(String),
          version: "1.0.0",
          environment: "test",
        },
      });
    });
  });
});
