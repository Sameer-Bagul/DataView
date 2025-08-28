import mongoose from 'mongoose';
import {
  type User,
  type UpsertUser,
  type ReportRequest,
  type InsertReportRequest,
  type MarketReport,
  type InsertMarketReport,
  type IUser,
  type IReportRequest,
  type IMarketReport,
} from "@shared/schema";
import connectToDatabase from "./db";
import { randomUUID } from "crypto";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  createUser(user: UpsertUser): Promise<User>;

  // Report Request operations
  createReportRequest(request: InsertReportRequest): Promise<ReportRequest>;
  getReportRequestsByUserId(userId: string): Promise<ReportRequest[]>;
  getReportRequest(id: string): Promise<ReportRequest | undefined>;
  updateReportRequestStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<ReportRequest>;

  // Market Report operations
  createMarketReport(report: InsertMarketReport): Promise<MarketReport>;
  getMarketReportsByUserId(userId: string): Promise<MarketReport[]>;
  getMarketReport(id: string): Promise<MarketReport | undefined>;
  updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport>;
  deleteMarketReport(id: string): Promise<boolean>;
}

// Define MongoDB models directly in storage to avoid circular dependencies
const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  profileImageUrl: { type: String },
  password: { type: String },
  oauthProvider: { type: String },
  oauthId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const reportRequestSchema = new mongoose.Schema<IReportRequest>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  industryName: { type: String, required: true },
  companyType: { type: String, required: true },
  reportScope: { type: String, required: true },
  region: { type: String },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  submittedAt: { type: Date, required: true },
  formMode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const marketReportSchema = new mongoose.Schema<IMarketReport>({
  id: { type: String, required: true, unique: true },
  requestId: { type: String },
  userId: { type: String, required: true },
  industryName: { type: String, required: true },
  companyType: { type: String, required: true },
  reportScope: { type: String, required: true },
  region: { type: String },
  submittedAt: { type: Date, required: true },
  formMode: { type: String },
  executiveSummary: { type: mongoose.Schema.Types.Mixed },
  marketIntroduction: { type: mongoose.Schema.Types.Mixed },
  marketDynamics: { type: mongoose.Schema.Types.Mixed },
  marketGrowthTrends: { type: mongoose.Schema.Types.Mixed },
  marketSegmentation: { type: mongoose.Schema.Types.Mixed },
  competitorAnalysis: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

// Create models
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
const ReportRequestModel = mongoose.models.ReportRequest || mongoose.model<IReportRequest>('ReportRequest', reportRequestSchema);
const MarketReportModel = mongoose.models.MarketReport || mongoose.model<IMarketReport>('MarketReport', marketReportSchema);

export class DatabaseStorage implements IStorage {
  constructor() {
    // Ensure database connection is established
    connectToDatabase().catch(console.error);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    await connectToDatabase();
    const user = await UserModel.findOne({ id }).lean();
    if (!user) return undefined;
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      password: user.password,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    await connectToDatabase();
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return undefined;
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      password: user.password,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    await connectToDatabase();
    const user = await UserModel.findOneAndUpdate(
      { id: userData.id },
      {
        ...userData,
        updatedAt: new Date(),
      },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true 
      }
    ).lean();

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      password: user.password,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(userData: UpsertUser): Promise<User> {
    await connectToDatabase();
    const user = await UserModel.create({
      ...userData,
      id: userData.id || randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      password: user.password,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Report Request operations
  async createReportRequest(requestData: InsertReportRequest): Promise<ReportRequest> {
    await connectToDatabase();
    const request = await ReportRequestModel.create({
      ...requestData,
      id: requestData.id || randomUUID(),
      createdAt: new Date(),
    });

    return {
      id: request.id,
      userId: request.userId,
      industryName: request.industryName,
      companyType: request.companyType,
      reportScope: request.reportScope,
      region: request.region,
      status: request.status,
      submittedAt: request.submittedAt,
      formMode: request.formMode,
      createdAt: request.createdAt,
    };
  }

  async getReportRequestsByUserId(userId: string): Promise<ReportRequest[]> {
    await connectToDatabase();
    const requests = await ReportRequestModel.find({ userId }).sort({ createdAt: -1 }).lean();
    
    return requests.map(request => ({
      id: request.id,
      userId: request.userId,
      industryName: request.industryName,
      companyType: request.companyType,
      reportScope: request.reportScope,
      region: request.region,
      status: request.status,
      submittedAt: request.submittedAt,
      formMode: request.formMode,
      createdAt: request.createdAt,
    }));
  }

  async getReportRequest(id: string): Promise<ReportRequest | undefined> {
    await connectToDatabase();
    const request = await ReportRequestModel.findOne({ id }).lean();
    if (!request) return undefined;

    return {
      id: request.id,
      userId: request.userId,
      industryName: request.industryName,
      companyType: request.companyType,
      reportScope: request.reportScope,
      region: request.region,
      status: request.status,
      submittedAt: request.submittedAt,
      formMode: request.formMode,
      createdAt: request.createdAt,
    };
  }

  async updateReportRequestStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<ReportRequest> {
    await connectToDatabase();
    const request = await ReportRequestModel.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    ).lean();

    if (!request) {
      throw new Error('Report request not found');
    }

    return {
      id: request.id,
      userId: request.userId,
      industryName: request.industryName,
      companyType: request.companyType,
      reportScope: request.reportScope,
      region: request.region,
      status: request.status,
      submittedAt: request.submittedAt,
      formMode: request.formMode,
      createdAt: request.createdAt,
    };
  }

  // Market Report operations
  async createMarketReport(reportData: InsertMarketReport): Promise<MarketReport> {
    await connectToDatabase();
    const report = await MarketReportModel.create({
      ...reportData,
      id: reportData.id || randomUUID(),
      createdAt: new Date(),
    });

    return {
      id: report.id,
      requestId: report.requestId,
      userId: report.userId,
      industryName: report.industryName,
      companyType: report.companyType,
      reportScope: report.reportScope,
      region: report.region,
      submittedAt: report.submittedAt,
      formMode: report.formMode,
      executiveSummary: report.executiveSummary,
      marketIntroduction: report.marketIntroduction,
      marketDynamics: report.marketDynamics,
      marketGrowthTrends: report.marketGrowthTrends,
      marketSegmentation: report.marketSegmentation,
      competitorAnalysis: report.competitorAnalysis,
      createdAt: report.createdAt,
    };
  }

  async getMarketReportsByUserId(userId: string): Promise<MarketReport[]> {
    await connectToDatabase();
    const reports = await MarketReportModel.find({ userId }).sort({ createdAt: -1 }).lean();

    return reports.map(report => ({
      id: report.id,
      requestId: report.requestId,
      userId: report.userId,
      industryName: report.industryName,
      companyType: report.companyType,
      reportScope: report.reportScope,
      region: report.region,
      submittedAt: report.submittedAt,
      formMode: report.formMode,
      executiveSummary: report.executiveSummary,
      marketIntroduction: report.marketIntroduction,
      marketDynamics: report.marketDynamics,
      marketGrowthTrends: report.marketGrowthTrends,
      marketSegmentation: report.marketSegmentation,
      competitorAnalysis: report.competitorAnalysis,
      createdAt: report.createdAt,
    }));
  }

  async getMarketReport(id: string): Promise<MarketReport | undefined> {
    await connectToDatabase();
    const report = await MarketReportModel.findOne({ id }).lean();
    if (!report) return undefined;

    return {
      id: report.id,
      requestId: report.requestId,
      userId: report.userId,
      industryName: report.industryName,
      companyType: report.companyType,
      reportScope: report.reportScope,
      region: report.region,
      submittedAt: report.submittedAt,
      formMode: report.formMode,
      executiveSummary: report.executiveSummary,
      marketIntroduction: report.marketIntroduction,
      marketDynamics: report.marketDynamics,
      marketGrowthTrends: report.marketGrowthTrends,
      marketSegmentation: report.marketSegmentation,
      competitorAnalysis: report.competitorAnalysis,
      createdAt: report.createdAt,
    };
  }

  async updateMarketReport(id: string, updates: Partial<MarketReport>): Promise<MarketReport> {
    await connectToDatabase();
    const report = await MarketReportModel.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    ).lean();

    if (!report) {
      throw new Error('Market report not found');
    }

    return {
      id: report.id,
      requestId: report.requestId,
      userId: report.userId,
      industryName: report.industryName,
      companyType: report.companyType,
      reportScope: report.reportScope,
      region: report.region,
      submittedAt: report.submittedAt,
      formMode: report.formMode,
      executiveSummary: report.executiveSummary,
      marketIntroduction: report.marketIntroduction,
      marketDynamics: report.marketDynamics,
      marketGrowthTrends: report.marketGrowthTrends,
      marketSegmentation: report.marketSegmentation,
      competitorAnalysis: report.competitorAnalysis,
      createdAt: report.createdAt,
    };
  }

  async deleteMarketReport(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await MarketReportModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export const storage = new DatabaseStorage();