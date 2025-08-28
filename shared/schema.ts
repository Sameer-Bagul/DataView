import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const reportRequests = pgTable("report_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  industryName: text("industry_name").notNull(),
  companyType: text("company_type").notNull(),
  reportScope: text("report_scope").notNull(),
  region: text("region"),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  submittedAt: timestamp("submitted_at").notNull(),
  formMode: text("form_mode"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const marketReports = pgTable("market_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: varchar("request_id").references(() => reportRequests.id),
  userId: varchar("user_id").references(() => users.id),
  industryName: text("industry_name").notNull(),
  companyType: text("company_type").notNull(),
  reportScope: text("report_scope").notNull(),
  region: text("region"),
  submittedAt: timestamp("submitted_at").notNull(),
  formMode: text("form_mode"),
  executiveSummary: jsonb("executive_summary"),
  marketIntroduction: jsonb("market_introduction"),
  marketDynamics: jsonb("market_dynamics"),
  marketGrowthTrends: jsonb("market_growth_trends"),
  marketSegmentation: jsonb("market_segmentation"),
  competitorAnalysis: jsonb("competitor_analysis"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Zod schemas for validation
export const executiveSummarySchema = z.object({
  marketAttractiveness: z.string(),
  historicalAnalysis: z.string(),
  futureProjections: z.string(),
  keyFindings: z.array(z.string()),
});

export const marketDynamicsSchema = z.object({
  drivers: z.array(z.string()),
  restraints: z.array(z.string()),
  opportunities: z.array(z.string()),
  challenges: z.array(z.string()),
});

export const swotAnalysisSchema = z.object({
  strengths: z.string(),
  weaknesses: z.string(),
  opportunities: z.string(),
  threats: z.string(),
});

export const pestelAnalysisSchema = z.object({
  political: z.string(),
  economic: z.string(),
  social: z.string(),
  technological: z.string(),
  environmental: z.string(),
  legal: z.string(),
});

export const porterAnalysisSchema = z.object({
  competitiveRivalry: z.string(),
  supplierPower: z.string(),
  buyerPower: z.string(),
  threatOfSubstitution: z.string(),
  threatOfNewEntrants: z.string(),
});

export const marketGrowthTrendsSchema = z.object({
  swotAnalysis: swotAnalysisSchema,
  pestelAnalysis: pestelAnalysisSchema,
  porterAnalysis: porterAnalysisSchema,
});

export const marketSegmentationSchema = z.object({
  byProductType: z.record(z.string()),
  byApplication: z.record(z.string()),
  byRegion: z.record(z.string()),
  marketSize: z.record(z.number()),
});

export const competitorSchema = z.object({
  name: z.string(),
  overview: z.string(),
  products: z.array(z.string()),
  financials: z.string(),
  swot: z.object({
    strengths: z.string(),
    weaknesses: z.string(),
    opportunities: z.string(),
    threats: z.string(),
  }),
  strategies: z.array(z.string()),
});

export const marketIntroductionSchema = z.object({
  definition: z.string(),
  scope: z.string(),
  marketStructure: z.string(),
  macroFactors: z.array(z.string()),
});

export const insertMarketReportSchema = createInsertSchema(marketReports).extend({
  executiveSummary: executiveSummarySchema.optional(),
  marketIntroduction: marketIntroductionSchema.optional(),
  marketDynamics: marketDynamicsSchema.optional(),
  marketGrowthTrends: marketGrowthTrendsSchema.optional(),
  marketSegmentation: marketSegmentationSchema.optional(),
  competitorAnalysis: z.array(competitorSchema).optional(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const insertReportRequestSchema = createInsertSchema(reportRequests).omit({ 
  id: true, 
  createdAt: true, 
  status: true 
});

export const reportGenerationSchema = z.object({
  "Industry Name": z.string().min(1, "Industry name is required"),
  "Your Company Type": z.enum(["Individual", "Corporate", "Startup", "SME"]),
  "Report Study Scope": z.enum(["Global", "Regional", "Locality Specific"]),
  "Region name (if Regional report)": z.string().optional(),
  "formMode": z.enum(["test", "production"]).optional().default("production"),
});

export const n8nWebhookSchema = z.object({
  "Industry Name": z.string(),
  "Your Company Type": z.string(),
  "Report Study Scope": z.string(),
  "Region name (if Regional report)": z.string().optional(),
  "submittedAt": z.string(),
  "formMode": z.string().optional(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ReportRequest = typeof reportRequests.$inferSelect;
export type InsertReportRequest = z.infer<typeof insertReportRequestSchema>;
export type ReportGenerationData = z.infer<typeof reportGenerationSchema>;
export type InsertMarketReport = z.infer<typeof insertMarketReportSchema>;
export type MarketReport = typeof marketReports.$inferSelect;
export type ExecutiveSummary = z.infer<typeof executiveSummarySchema>;
export type MarketDynamics = z.infer<typeof marketDynamicsSchema>;
export type MarketGrowthTrends = z.infer<typeof marketGrowthTrendsSchema>;
export type MarketSegmentation = z.infer<typeof marketSegmentationSchema>;
export type Competitor = z.infer<typeof competitorSchema>;
export type N8nWebhookData = z.infer<typeof n8nWebhookSchema>;
