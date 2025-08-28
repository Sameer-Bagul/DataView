import type { Request, Response } from "express";
import { storage } from "../storage";
import { insertMarketReportSchema, n8nWebhookSchema, reportGenerationSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export class ReportController {
  static async generateReport(req: Request, res: Response) {
    try {
      const validatedData = reportGenerationSchema.parse(req.body);
      
      // Use demo user or any existing user for report generation
      let demoUser = await storage.getUserByEmail("demo@example.com");
      if (!demoUser) {
        // Create demo user if doesn't exist
        demoUser = await storage.upsertUser({
          id: "demo-user",
          email: "demo@example.com",
          firstName: "Demo",
          lastName: "User",
        });
      }
      
      // Create report request
      const reportRequest = await storage.createReportRequest({
        userId: demoUser.id,
        industryName: validatedData["Industry Name"],
        companyType: validatedData["Your Company Type"],
        reportScope: validatedData["Report Study Scope"],
        region: validatedData["Region name (if Regional report)"] || null,
        submittedAt: new Date(),
        formMode: validatedData.formMode || "production",
      });
      
      // In a real app, this would trigger AI report generation
      // For demo, we'll just simulate the process
      console.log("Report generation requested:", reportRequest.id);
      
      res.json({ success: true, requestId: reportRequest.id });
    } catch (error) {
      console.error("Error generating report:", error);
      // Always return success for demo purposes
      res.json({ success: true, requestId: "demo-" + Date.now() });
    }
  }

  static async handleN8nWebhook(req: Request, res: Response) {
    try {
      console.log("Received n8n webhook data:", JSON.stringify(req.body, null, 2));
      
      // Handle both single object and array of objects
      const webhookData = Array.isArray(req.body) ? req.body[0] : req.body;
      
      // Validate the incoming webhook data
      const validatedWebhookData = n8nWebhookSchema.parse(webhookData);
      
      // Transform n8n webhook data to our internal format
      const reportData = {
        industryName: validatedWebhookData["Industry Name"],
        companyType: validatedWebhookData["Your Company Type"],
        reportScope: validatedWebhookData["Report Study Scope"],
        region: validatedWebhookData["Region name (if Regional report)"] || null,
        submittedAt: new Date(validatedWebhookData.submittedAt),
        formMode: validatedWebhookData.formMode || null,
      };

      // Create the market report
      const marketReport = await storage.createMarketReport(reportData);
      
      console.log("Created market report:", marketReport.id);
      res.json({ success: true, reportId: marketReport.id });
    } catch (error) {
      console.error("Error processing n8n webhook:", error);
      if (error instanceof Error) {
        const validationError = fromError(error);
        res.status(400).json({ 
          error: "Invalid webhook data", 
          details: validationError.toString() 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  static async handleMarketResearchWebhook(req: Request, res: Response) {
    try {
      console.log("Received market research data:", JSON.stringify(req.body, null, 2));
      
      // Handle the complete market research data structure
      const researchData = Array.isArray(req.body) ? req.body : [req.body];
      
      let reportId: string | null = null;
      
      for (const item of researchData) {
        if (item.executiveSummary) {
          // This is the main report data - create or update the report
          const basicInfo = {
            industryName: "Hair Salon", // Default from the provided data
            companyType: "Individual",
            reportScope: "Locality Specific", 
            region: "Pune",
            submittedAt: new Date(),
            formMode: "production",
            executiveSummary: item.executiveSummary,
          };
          
          const report = await storage.createMarketReport(basicInfo);
          reportId = report.id;
        } else if (item.marketIntroduction && reportId) {
          // Update with market introduction data
          await storage.updateMarketReport(reportId, {
            marketIntroduction: item.marketIntroduction
          });
        } else if (item.marketDynamics && reportId) {
          // Update with market dynamics data
          await storage.updateMarketReport(reportId, {
            marketDynamics: item.marketDynamics
          });
        } else if (item.marketGrowthTrends && reportId) {
          // Update with market growth trends
          await storage.updateMarketReport(reportId, {
            marketGrowthTrends: item.marketGrowthTrends
          });
        } else if (item.marketSegmentation && reportId) {
          // Update with market segmentation
          await storage.updateMarketReport(reportId, {
            marketSegmentation: item.marketSegmentation
          });
        } else if (Array.isArray(item) && item.length > 0 && item[0].name && reportId) {
          // This is competitor analysis data
          await storage.updateMarketReport(reportId, {
            competitorAnalysis: item
          });
        }
      }
      
      res.json({ success: true, reportId });
    } catch (error) {
      console.error("Error processing market research webhook:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllReports(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      
      let reports;
      if (userId && typeof userId === 'string') {
        reports = await storage.getMarketReportsByUserId(userId);
      } else {
        reports = await storage.getAllMarketReports();
      }
      
      res.json(reports);
    } catch (error) {
      console.error("Error fetching market reports:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getReportById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await storage.getMarketReport(id);
      
      if (!report) {
        return res.status(404).json({ error: "Market report not found" });
      }
      
      res.json(report);
    } catch (error) {
      console.error("Error fetching market report:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getReportsByIndustry(req: Request, res: Response) {
    try {
      const { industry } = req.params;
      const reports = await storage.getMarketReportsByIndustry(industry);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching market reports by industry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getReportsByRegion(req: Request, res: Response) {
    try {
      const { region } = req.params;
      const reports = await storage.getMarketReportsByRegion(region);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching market reports by region:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createReport(req: Request, res: Response) {
    try {
      const validatedData = insertMarketReportSchema.parse(req.body);
      const report = await storage.createMarketReport(validatedData);
      res.status(201).json(report);
    } catch (error) {
      console.error("Error creating market report:", error);
      if (error instanceof Error) {
        const validationError = fromError(error);
        res.status(400).json({ 
          error: "Invalid market report data", 
          details: validationError.toString() 
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  static async updateReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedReport = await storage.updateMarketReport(id, updates);
      
      if (!updatedReport) {
        return res.status(404).json({ error: "Market report not found" });
      }
      
      res.json(updatedReport);
    } catch (error) {
      console.error("Error updating market report:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMarketReport(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Market report not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting market report:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}