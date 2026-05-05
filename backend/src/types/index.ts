// Extend Express Request to include multer file
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
