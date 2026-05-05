import express from "express";
import cors from "cors";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    // CORS configuration
    this.app.use(
      cors({
        origin: config.corsOrigin,
        credentials: true,
      }),
    );

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  }

  private configureRoutes(): void {
    // API routes
    this.app.use(config.apiPrefix, routes);
  }

  private configureErrorHandling(): void {
    // Global error handler
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Create and start server
const server = new Server();
server.start();

export default server;
