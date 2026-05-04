import axios from "axios";
import { SubmissionData } from "../types";

export const submitVehicleForm = async (
  make: string,
  model: string,
  badge: string,
  file: File,
): Promise<SubmissionData> => {
  const formData = new FormData();
  formData.append("make", make);
  formData.append("model", model);
  formData.append("badge", badge);
  formData.append("logbook", file);

  try {
    const response = await axios.post<SubmissionData>(
      "/api/vehicles/submit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    const axiosError = error as any;
    throw new Error(
      axiosError.response?.data?.error ||
        axiosError.message ||
        "Upload failed.",
    );
  }
};
