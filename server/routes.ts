import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, isAuthenticated } from "./auth/replitAuth";
import { AuthController } from "./controllers/authController";
import { ReportController } from "./controllers/reportController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, AuthController.getUser);

  // Report generation routes
  app.post("/api/reports/generate", ReportController.generateReport);
  
  // Webhook endpoints
  app.post("/api/webhook/n8n", ReportController.handleN8nWebhook);
  app.post("/api/webhook/market-research", ReportController.handleMarketResearchWebhook);

  // Market report CRUD routes
  app.get("/api/market-reports", ReportController.getAllReports);
  app.get("/api/market-reports/:id", ReportController.getReportById);
  app.get("/api/market-reports/industry/:industry", ReportController.getReportsByIndustry);
  app.get("/api/market-reports/region/:region", ReportController.getReportsByRegion);
  app.post("/api/market-reports", ReportController.createReport);
  app.patch("/api/market-reports/:id", ReportController.updateReport);
  app.delete("/api/market-reports/:id", ReportController.deleteReport);

  // Protected route example
  app.get("/api/protected", isAuthenticated, async (req: any, res) => {
    const userId = req.user?.claims?.sub;
    res.json({ message: "This is a protected route", userId });
  });

  const httpServer = createServer(app);
  return httpServer;
}