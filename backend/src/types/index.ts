export interface VehicleSubmission {
  make: string;
  model: string;
  badge: string;
}

export interface LogbookFile extends Express.Multer.File {
  buffer: Buffer;
}

export interface VehicleSubmissionResponse {
  vehicle: VehicleSubmission;
  logbook: string;
  timestamp: Date;
  id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheckResponse {
  timestamp: string;
  version: string;
  environment: string;
}
