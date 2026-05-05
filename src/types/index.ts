export interface VehicleData {
  [make: string]: {
    [model: string]: string[];
  };
}

export interface QuickPreset {
  label: string;
  make: string;
  model: string;
  badge: string;
}

export interface SubmissionData {
  data: SubmissionResponse;
  success: boolean;
  message: string;
}

export interface SubmissionResponse {
  vehicle: {
    make: string;
    model: string;
    badge: string;
  };
  logbook: string;
}

export interface StatusMessage {
  type: "success" | "error";
  message: string;
}
