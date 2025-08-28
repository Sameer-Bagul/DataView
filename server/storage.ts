import { type MarketReport, type InsertMarketReport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getMarketReport(id: string): Promise<MarketReport | undefined>;
  getAllMarketReports(): Promise<MarketReport[]>;
  getMarketReportsByIndustry(industry: string): Promise<MarketReport[]>;
  getMarketReportsByRegion(region: string): Promise<MarketReport[]>;
  createMarketReport(report: InsertMarketReport): Promise<MarketReport>;
  updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport | undefined>;
  deleteMarketReport(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private marketReports: Map<string, MarketReport>;

  constructor() {
    this.marketReports = new Map();
  }

  async getMarketReport(id: string): Promise<MarketReport | undefined> {
    return this.marketReports.get(id);
  }

  async getAllMarketReports(): Promise<MarketReport[]> {
    return Array.from(this.marketReports.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getMarketReportsByIndustry(industry: string): Promise<MarketReport[]> {
    return Array.from(this.marketReports.values()).filter(
      (report) => report.industryName.toLowerCase().includes(industry.toLowerCase())
    );
  }

  async getMarketReportsByRegion(region: string): Promise<MarketReport[]> {
    return Array.from(this.marketReports.values()).filter(
      (report) => report.region?.toLowerCase().includes(region.toLowerCase())
    );
  }

  async createMarketReport(insertReport: InsertMarketReport): Promise<MarketReport> {
    const id = randomUUID();
    const now = new Date();
    const report: MarketReport = {
      ...insertReport,
      id,
      createdAt: now,
      submittedAt: insertReport.submittedAt || now,
    };
    this.marketReports.set(id, report);
    return report;
  }

  async updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport | undefined> {
    const existing = this.marketReports.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.marketReports.set(id, updated);
    return updated;
  }

  async deleteMarketReport(id: string): Promise<boolean> {
    return this.marketReports.delete(id);
  }
}

export const storage = new MemStorage();
