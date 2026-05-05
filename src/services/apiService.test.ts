import axios from "axios";
import { submitVehicleForm } from "./apiService";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("submitVehicleForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits form data successfully", async () => {
    const mockResponse = {
      data: {
        data: {
          vehicle: { make: "tesla", model: "Model 3", badge: "Performance" },
          logbook: "content",
        },
        success: true,
        message: "Success",
      },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const file = new File(["content"], "logbook.txt");
    const result = await submitVehicleForm(
      "tesla",
      "Model 3",
      "Performance",
      file,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/vehicles/submit",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const formData = mockedAxios.post.mock.calls[0][1] as FormData;
    expect(formData.get("make")).toBe("tesla");
    expect(formData.get("model")).toBe("Model 3");
    expect(formData.get("badge")).toBe("Performance");
    expect(formData.get("logbook")).toBe(file);

    expect(result).toEqual(mockResponse.data);
  });

  it("handles API error with response data", async () => {
    const errorResponse = {
      response: {
        data: {
          error: "Invalid file",
        },
      },
    };
    mockedAxios.post.mockRejectedValue(errorResponse);

    const file = new File(["content"], "logbook.txt");
    await expect(
      submitVehicleForm("tesla", "Model 3", "Performance", file),
    ).rejects.toThrow("Invalid file");
  });

  it("handles network error", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);

    const file = new File(["content"], "logbook.txt");
    await expect(
      submitVehicleForm("tesla", "Model 3", "Performance", file),
    ).rejects.toThrow("Network error");
  });

  it("handles axios error with message", async () => {
    const error = { message: "Request failed" };
    mockedAxios.post.mockRejectedValue(error);

    const file = new File(["content"], "logbook.txt");
    await expect(
      submitVehicleForm("tesla", "Model 3", "Performance", file),
    ).rejects.toThrow("Request failed");
  });
});
