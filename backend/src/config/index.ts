import dotenv from "dotenv";

dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  host: string;
  apiPrefix: string;
  corsOrigin: string;
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  host: process.env.HOST || "localhost",
  apiPrefix: process.env.API_PREFIX || "/api",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

export default config;
