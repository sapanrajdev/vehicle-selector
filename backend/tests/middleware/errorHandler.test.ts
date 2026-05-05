import { Request, Response, NextFunction } from "express";
import { errorHandler, AppError } from "../../src/middleware/errorHandler";
import { asyncHandler } from "../../src/middleware/asyncHandler";

describe("errorHandler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("AppError", () => {
    it("should create AppError with default values", () => {
      const error = new AppError("Test error", 500);
      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(500);
    });

    it("should create AppError with custom values", () => {
      const error = new AppError("Test error", 400);
      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(400);
    });
  });

  describe("errorHandler", () => {
    it("should handle AppError", () => {
      const appError = new AppError("App error", 400);

      errorHandler(
        appError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: "App error",
      });
    });

    it("should handle generic Error", () => {
      const genericError = new Error("Generic error");

      errorHandler(
        genericError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: "Internal Server Error",
      });
    });
  });

  describe("asyncHandler", () => {
    it("should call next with error if async function throws", async () => {
      const asyncFn = asyncHandler(
        async (_req: Request, _res: Response, _next: NextFunction) => {
          throw new Error("Async error");
        },
      );

      await asyncFn(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error("Async error"));
    });

    it("should not call next if async function succeeds", async () => {
      const asyncFn = asyncHandler(
        async (_req: Request, _res: Response, _next: NextFunction) => {
          // Do nothing
        },
      );

      await asyncFn(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
