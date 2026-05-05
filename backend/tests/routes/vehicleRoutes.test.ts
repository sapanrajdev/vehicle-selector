import request from "supertest";
import express from "express";
import vehicleRoutes from "../../src/routes/vehicleRoutes";
import { VehicleService } from "../../src/services/vehicleService";
import { errorHandler } from "../../src/middleware/errorHandler";

jest.mock("../../src/services/vehicleService");

const app = express();
app.use(express.json());
app.use("/vehicles", vehicleRoutes);
app.use(errorHandler);

describe("Vehicle Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /vehicles/submit", () => {
    it("should submit vehicle successfully", async () => {
      const mockResult = {
        vehicle: { make: "Toyota", model: "Camry", badge: "LE" },
        logbook: "Sample logbook content",
        timestamp: "2026-05-04T19:53:41.881Z",
        id: "test-id",
      };

      (VehicleService.processVehicleSubmission as jest.Mock).mockResolvedValue(
        mockResult,
      );

      const response = await request(app)
        .post("/vehicles/submit")
        .field("make", "Toyota")
        .field("model", "Camry")
        .field("badge", "LE")
        .attach(
          "logbook",
          Buffer.from("Sample logbook content"),
          "logbook.txt",
        );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: {
          vehicle: { make: "Toyota", model: "Camry", badge: "LE" },
          logbook: "Sample logbook content",
          timestamp: expect.any(String),
          id: expect.any(String),
        },
        message: "Vehicle submission processed successfully",
      });
    });

    it("should return 400 for missing logbook file", async () => {
      const response = await request(app)
        .post("/vehicles/submit")
        .field("make", "Toyota")
        .field("model", "Camry")
        .field("badge", "LE");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        error: "Logbook file is required",
      });
    });

    it("should return 400 for invalid file type", async () => {
      const response = await request(app)
        .post("/vehicles/submit")
        .field("make", "Toyota")
        .field("model", "Camry")
        .field("badge", "LE")
        .attach("logbook", Buffer.from("content"), "logbook.jpg");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        error: "Only text files are allowed",
      });
    });

    it("should handle service errors", async () => {
      (VehicleService.processVehicleSubmission as jest.Mock).mockRejectedValue(
        new Error("Service error"),
      );

      const response = await request(app)
        .post("/vehicles/submit")
        .field("make", "Toyota")
        .field("model", "Camry")
        .field("badge", "LE")
        .attach("logbook", Buffer.from("content"), "logbook.txt");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        error: "Internal Server Error",
      });
    });
  });
});
