import { z } from 'zod';
import mongoose, { Schema, Document } from 'mongoose';

// MongoDB User Schema
export const userSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  password: z.string().optional(),
  oauthProvider: z.string().optional(),
  oauthId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;
export type UpsertUser = Omit<User, '_id' | 'createdAt' | 'updatedAt'>;

// Login schema for authentication
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginData = z.infer<typeof loginSchema>;

// Report Request Schema
export const reportRequestSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  userId: z.string(),
  industryName: z.string(),
  companyType: z.string(),
  reportScope: z.string(),
  region: z.string().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).default('pending'),
  submittedAt: z.date(),
  formMode: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export type ReportRequest = z.infer<typeof reportRequestSchema>;
export type InsertReportRequest = Omit<ReportRequest, '_id' | 'createdAt'>;

// Market Report Schema
export const marketReportSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  requestId: z.string().optional(),
  userId: z.string(),
  industryName: z.string(),
  companyType: z.string(),
  reportScope: z.string(),
  region: z.string().optional(),
  submittedAt: z.date(),
  formMode: z.string().optional(),
  executiveSummary: z.object({
    marketAttractiveness: z.string(),
    historicalAnalysis: z.string(),
    futureProjections: z.string(),
    keyFindings: z.array(z.string()),
  }).optional(),
  marketIntroduction: z.object({
    overview: z.string(),
    keyPlayers: z.array(z.string()),
    marketSize: z.string(),
    geographicScope: z.string(),
  }).optional(),
  marketDynamics: z.object({
    drivers: z.array(z.string()),
    restraints: z.array(z.string()),
    opportunities: z.array(z.string()),
    challenges: z.array(z.string()),
  }).optional(),
  marketGrowthTrends: z.object({
    historicalGrowth: z.string(),
    currentTrends: z.array(z.string()),
    futureProjections: z.string(),
    cagr: z.string(),
  }).optional(),
  marketSegmentation: z.object({
    byProduct: z.array(z.string()),
    byApplication: z.array(z.string()),
    byRegion: z.array(z.string()),
    byEndUser: z.array(z.string()),
  }).optional(),
  competitorAnalysis: z.object({
    majorPlayers: z.array(z.string()),
    marketShares: z.array(z.string()),
    competitiveStrategies: z.array(z.string()),
    swotAnalysis: z.string(),
  }).optional(),
  createdAt: z.date().default(() => new Date()),
});

export type MarketReport = z.infer<typeof marketReportSchema>;
export type InsertMarketReport = Omit<MarketReport, '_id' | 'createdAt'>;

// Generate Report Request Schema
export const generateReportSchema = z.object({
  industryName: z.string().min(1, "Industry name is required"),
  companyType: z.string().min(1, "Company type is required"),
  reportScope: z.string().min(1, "Report scope is required"),
  region: z.string().optional(),
  formMode: z.enum(['basic', 'advanced']).default('basic'),
});

export type GenerateReportData = z.infer<typeof generateReportSchema>;

// Mongoose Models
export interface IUser extends Document {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  password?: string;
  oauthProvider?: string;
  oauthId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReportRequest extends Document {
  id: string;
  userId: string;
  industryName: string;
  companyType: string;
  reportScope: string;
  region?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  submittedAt: Date;
  formMode?: string;
  createdAt: Date;
}

export interface IMarketReport extends Document {
  id: string;
  requestId?: string;
  userId: string;
  industryName: string;
  companyType: string;
  reportScope: string;
  region?: string;
  submittedAt: Date;
  formMode?: string;
  executiveSummary?: any;
  marketIntroduction?: any;
  marketDynamics?: any;
  marketGrowthTrends?: any;
  marketSegmentation?: any;
  competitorAnalysis?: any;
  createdAt: Date;
}

// MongoDB Schemas
const UserMongooseSchema = new Schema<IUser>({
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

const ReportRequestMongooseSchema = new Schema<IReportRequest>({
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

const MarketReportMongooseSchema = new Schema<IMarketReport>({
  id: { type: String, required: true, unique: true },
  requestId: { type: String },
  userId: { type: String, required: true },
  industryName: { type: String, required: true },
  companyType: { type: String, required: true },
  reportScope: { type: String, required: true },
  region: { type: String },
  submittedAt: { type: Date, required: true },
  formMode: { type: String },
  executiveSummary: { type: Schema.Types.Mixed },
  marketIntroduction: { type: Schema.Types.Mixed },
  marketDynamics: { type: Schema.Types.Mixed },
  marketGrowthTrends: { type: Schema.Types.Mixed },
  marketSegmentation: { type: Schema.Types.Mixed },
  competitorAnalysis: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

// Export Models (declare conditional to avoid re-compilation issues)
let UserModel: any;
let ReportRequestModel: any;
let MarketReportModel: any;

try {
  UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserMongooseSchema);
  ReportRequestModel = mongoose.models.ReportRequest || mongoose.model<IReportRequest>('ReportRequest', ReportRequestMongooseSchema);
  MarketReportModel = mongoose.models.MarketReport || mongoose.model<IMarketReport>('MarketReport', MarketReportMongooseSchema);
} catch (error) {
  // Models may not be available on client-side
  console.log('Models not available in this environment');
}

export { UserModel, ReportRequestModel, MarketReportModel };