import {
  users,
  marketReports,
  reportRequests,
  type MarketReport,
  type InsertMarketReport,
  type User,
  type UpsertUser,
  type ReportRequest,
  type InsertReportRequest
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Report request methods
  getReportRequest(id: string): Promise<ReportRequest | undefined>;
  getReportRequestsByUserId(userId: string): Promise<ReportRequest[]>;
  createReportRequest(request: InsertReportRequest): Promise<ReportRequest>;
  updateReportRequestStatus(id: string, status: string): Promise<ReportRequest | undefined>;
  
  // Market report methods
  getMarketReport(id: string): Promise<MarketReport | undefined>;
  getAllMarketReports(): Promise<MarketReport[]>;
  getMarketReportsByUserId(userId: string): Promise<MarketReport[]>;
  getMarketReportsByIndustry(industry: string): Promise<MarketReport[]>;
  getMarketReportsByRegion(region: string): Promise<MarketReport[]>;
  createMarketReport(report: InsertMarketReport): Promise<MarketReport>;
  updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport | undefined>;
  deleteMarketReport(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Report request methods
  async getReportRequest(id: string): Promise<ReportRequest | undefined> {
    const [request] = await db.select().from(reportRequests).where(eq(reportRequests.id, id));
    return request;
  }

  async getReportRequestsByUserId(userId: string): Promise<ReportRequest[]> {
    const requests = await db.select().from(reportRequests).where(eq(reportRequests.userId, userId));
    return requests.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createReportRequest(insertRequest: InsertReportRequest): Promise<ReportRequest> {
    const [request] = await db
      .insert(reportRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async updateReportRequestStatus(id: string, status: string): Promise<ReportRequest | undefined> {
    const [updated] = await db
      .update(reportRequests)
      .set({ status })
      .where(eq(reportRequests.id, id))
      .returning();
    return updated;
  }

  // Market report methods
  async getMarketReport(id: string): Promise<MarketReport | undefined> {
    const [report] = await db.select().from(marketReports).where(eq(marketReports.id, id));
    return report;
  }

  async getAllMarketReports(): Promise<MarketReport[]> {
    const reports = await db.select().from(marketReports);
    return reports.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getMarketReportsByUserId(userId: string): Promise<MarketReport[]> {
    const reports = await db.select().from(marketReports).where(eq(marketReports.userId, userId));
    return reports.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getMarketReportsByIndustry(industry: string): Promise<MarketReport[]> {
    const reports = await db.select().from(marketReports).where(eq(marketReports.industryName, industry));
    return reports.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getMarketReportsByRegion(region: string): Promise<MarketReport[]> {
    const reports = await db.select().from(marketReports).where(eq(marketReports.region, region));
    return reports.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createMarketReport(insertReport: InsertMarketReport): Promise<MarketReport> {
    const [report] = await db
      .insert(marketReports)
      .values(insertReport)
      .returning();
    return report;
  }

  async updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport | undefined> {
    const [updated] = await db
      .update(marketReports)
      .set(updates)
      .where(eq(marketReports.id, id))
      .returning();
    return updated;
  }

  async deleteMarketReport(id: string): Promise<boolean> {
    const result = await db.delete(marketReports).where(eq(marketReports.id, id));
    return (result as any).rowCount > 0;
  }
}

export const storage = new DatabaseStorage();