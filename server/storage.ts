import { type MarketReport, type InsertMarketReport, type User, type InsertUser, type ReportRequest, type InsertReportRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reportRequests: Map<string, ReportRequest>;
  private marketReports: Map<string, MarketReport>;

  constructor() {
    this.users = new Map();
    this.reportRequests = new Map();
    this.marketReports = new Map();
    this.initializeSampleData();
  }

  // User methods
  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      createdAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  // Report request methods
  async getReportRequest(id: string): Promise<ReportRequest | undefined> {
    return this.reportRequests.get(id);
  }

  async getReportRequestsByUserId(userId: string): Promise<ReportRequest[]> {
    return Array.from(this.reportRequests.values()).filter(
      (request) => request.userId === userId
    ).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createReportRequest(insertRequest: InsertReportRequest): Promise<ReportRequest> {
    const id = randomUUID();
    const now = new Date();
    const request: ReportRequest = {
      ...insertRequest,
      id,
      status: "pending",
      createdAt: now,
    };
    this.reportRequests.set(id, request);
    return request;
  }

  async updateReportRequestStatus(id: string, status: string): Promise<ReportRequest | undefined> {
    const existing = this.reportRequests.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.reportRequests.set(id, updated);
    return updated;
  }

  private async initializeSampleData() {
    // Create a demo user
    const demoUser: User = {
      id: randomUUID(),
      email: "demo@example.com",
      password: "password123", // In real app, this would be hashed
      name: "Demo User",
      createdAt: new Date(),
    };
    this.users.set(demoUser.id, demoUser);

    // Add the hair salon market research sample data
    const sampleReport: MarketReport = {
      id: randomUUID(),
      requestId: null,
      userId: demoUser.id,
      industryName: "Hair Salon",
      companyType: "Individual", 
      reportScope: "Locality Specific",
      region: "Pune",
      submittedAt: new Date("2025-08-27T19:51:17.977+05:30"),
      formMode: "production",
      createdAt: new Date(),
      executiveSummary: {
        marketAttractiveness: "The Pune hair saloon market exhibits moderate attractiveness, driven by a young demographic, increasing disposable incomes, and a rising emphasis on personal grooming. However, intense competition and high operational costs pose challenges.",
        historicalAnalysis: "The Pune hair saloon market has experienced steady growth over the past decade, fueled by urbanization and changing lifestyle trends. The market has evolved from basic haircut services to include a wide array of specialized treatments and services, with an increasing adoption of premium brands.",
        futureProjections: "The hair saloon market in Pune is projected to maintain a consistent growth trajectory, influenced by evolving fashion trends and an expanding customer base. Digital marketing and online booking platforms will be key factors influencing market dynamics.",
        keyFindings: [
          "Rising disposable incomes and fashion consciousness are key drivers.",
          "Increasing demand for specialized hair and beauty treatments.",
          "Intense competition among local and international brands.",
          "The impact of social media and online booking platforms on customer acquisition and service offerings.",
          "Expansion of premium services and product offerings."
        ]
      },
      marketIntroduction: {
        definition: "The hair saloon industry in Pune encompasses businesses offering professional hair care services, including haircuts, styling, coloring, treatments, and related beauty services.",
        scope: "This analysis focuses on the organized and unorganized hair saloon sector within the Pune Metropolitan Area (PMA), including all localities.",
        marketStructure: "The market structure is characterized by a mix of international chains, regional brands, and independent salons. Competition is intense, with differentiation based on service quality, pricing, location, and specialization.",
        macroFactors: [
          "Increasing disposable incomes in Pune driving consumer spending on personal care.",
          "Growing awareness of grooming and beauty trends.",
          "Influence of social media and celebrity culture on hair styling preferences.",
          "Real estate costs impacting salon rentals and operational expenses.",
          "Availability of skilled labor and training infrastructure."
        ]
      },
      marketDynamics: {
        drivers: [
          "Increasing disposable income leading to higher spending on personal grooming services.",
          "Growing awareness of personal aesthetics and grooming trends among the Pune population.",
          "Rising influence of social media and celebrity trends on hairstyle preferences.",
          "Expansion of the salon industry with various service offerings (hair, skin, nails, etc.).",
          "Convenient accessibility due to increasing number of salons across different localities in Pune."
        ],
        restraints: [
          "Intense competition among salons leading to price wars and reduced profit margins.",
          "High operational costs including rent, utilities, and skilled labor.",
          "Seasonal variations in demand, particularly during festive seasons and weddings.",
          "Economic downturns impacting discretionary spending on non-essential services.",
          "Customer preference for home-based services or DIY grooming to save costs."
        ],
        opportunities: [
          "Growing demand for specialized services such as organic hair treatments, keratin treatments, and hair spas.",
          "Expansion into underserved areas or localities with limited salon options.",
          "Development of mobile salon services to cater to the convenience of customers.",
          "Strategic partnerships with local businesses (e.g., spas, boutiques) for cross-promotion.",
          "Leveraging online platforms and social media for marketing, appointment scheduling, and customer engagement."
        ],
        challenges: [
          "Attracting and retaining skilled hairstylists and technicians in a competitive market.",
          "Maintaining service quality and consistency across all service offerings.",
          "Managing customer expectations and providing personalized services.",
          "Adapting to rapidly changing trends and consumer preferences.",
          "Dealing with regulatory requirements and compliance related to hygiene and safety standards."
        ]
      },
      marketGrowthTrends: {
        swotAnalysis: {
          strengths: "High demand for grooming services, skilled labor availability, and increasing disposable incomes.",
          weaknesses: "High operational costs (rent, equipment), reliance on skilled staff, and intense competition.",
          opportunities: "Expansion of service offerings (e.g., spa treatments), online booking and marketing, and strategic partnerships.",
          threats: "Rising operational costs, competition from established salons and new entrants, and economic downturns affecting consumer spending."
        },
        pestelAnalysis: {
          political: "Local government regulations and licensing requirements for salons and spas.",
          economic: "Impact of inflation on disposable income and consumer spending on discretionary services.",
          social: "Changing fashion trends, growing awareness of personal grooming, and influence of social media.",
          technological: "Adoption of online booking systems, digital marketing, and advanced hair treatment technologies.",
          environmental: "Use of eco-friendly products and waste management practices.",
          legal: "Compliance with labor laws, health and safety regulations, and consumer protection acts."
        },
        porterAnalysis: {
          competitiveRivalry: "High, with numerous salons, spas, and barbershops offering similar services in Pune.",
          supplierPower: "Moderate, as suppliers of hair products and equipment have several options.",
          buyerPower: "Moderate, with consumers having several choices and price sensitivity.",
          threatOfSubstitution: "Moderate, with home grooming options and alternative beauty treatments available.",
          threatOfNewEntrants: "High, due to relatively low barriers to entry, such as capital and readily available skills."
        }
      },
      marketSegmentation: {
        byProductType: {
          "Haircut": "Basic and Trendy Cuts",
          "HairColoring": "Permanent, Semi-Permanent, Highlights, Balayage"
        },
        byApplication: {
          "Personal": "Individuals seeking routine grooming",
          "SpecialOccasion": "Weddings, Parties, and Events"
        },
        byRegion: {
          "KoregaonPark": "Upscale Saloons",
          "Hinjewadi": "Salons catering to IT professionals"
        },
        marketSize: {
          "2020": 150000000,
          "2025": 220000000,
          "2030": 300000000
        }
      },
      competitorAnalysis: [
        {
          name: "Enrich Salon",
          overview: "Enrich Salon is a well-known hair salon chain in the Pune region, offering a wide array of hair and beauty services.",
          products: [
            "Haircuts & Styling",
            "Hair Coloring",
            "Hair Treatments",
            "Bridal Services",
            "Skincare",
            "Makeup",
            "Nail Care"
          ],
          financials: "Financial data is not publicly available; however, the company is known to be profitable and has a strong market presence in the region.",
          swot: {
            strengths: "Strong brand recognition and customer loyalty; Wide range of services; Skilled stylists and technicians.",
            weaknesses: "Higher price point compared to some competitors; Dependence on foot traffic.",
            opportunities: "Expansion of service offerings; Potential for franchising; Digital marketing and online booking.",
            threats: "Competition from other salons and beauty parlors; Economic downturns could reduce consumer spending; Changing fashion trends."
          },
          strategies: [
            "Enhance digital presence and online booking system",
            "Loyalty programs to retain customers",
            "Offer specialized services to target specific customer segments",
            "Expand the number of salons within the region."
          ]
        },
        {
          name: "Looks Salon", 
          overview: "Looks Salon is a well-known hair and beauty salon chain operating in the Pune region, offering a range of services including haircuts, styling, coloring, and various beauty treatments.",
          products: [
            "Haircuts & Styling",
            "Hair Coloring",
            "Hair Treatments",
            "Facials",
            "Waxing",
            "Bridal Packages",
            "Hair Extensions",
            "Manicures & Pedicures"
          ],
          financials: "Financial data for Looks Salon is not publicly available. However, the company is known to be a significant player in the regional salon market, with a substantial customer base and revenue stream.",
          swot: {
            strengths: "Strong brand recognition and customer loyalty. Extensive network of salons across the region. Wide range of services offered. Well-trained staff.",
            weaknesses: "Pricing may be higher compared to some competitors. Reliance on foot traffic.",
            opportunities: "Expansion into new geographic areas within the region. Introduction of new beauty and hair care services. Online booking and e-commerce for products.",
            threats: "Competition from other established salons and emerging players. Economic downturn affecting consumer spending. Changing fashion trends requiring continuous innovation."
          },
          strategies: [
            "Focus on customer retention through loyalty programs and excellent service",
            "Continuous training and development of staff to maintain service quality",
            "Expansion of services to cater to a wider customer base",
            "Strategic marketing to attract new customers",
            "Adoption of digital platforms for online booking and product sales"
          ]
        },
        {
          name: "Jawed Habib Hair & Beauty Salon",
          overview: "Jawed Habib is a prominent hair and beauty salon chain in Pune region, known for its extensive service offerings and brand recognition.",
          products: [
            "Haircuts & Styling",
            "Hair Coloring", 
            "Hair Treatments",
            "Bridal Services",
            "Facials",
            "Manicures & Pedicures",
            "Makeup Services"
          ],
          financials: "Financial performance varies based on outlet location and market conditions. Revenue is generated through service charges and product sales.",
          swot: {
            strengths: "Strong brand reputation and recognition; Wide range of services; Skilled stylists and technicians; Extensive network of salons across the region.",
            weaknesses: "High operational costs; Dependence on skilled labor; Sensitivity to economic downturns; Limited online presence compared to some competitors.",
            opportunities: "Expansion into underserved markets; Introduction of new and innovative services; Strategic partnerships with beauty product brands; Leveraging digital marketing for customer acquisition.",
            threats: "Intense competition from local salons and international chains; Changing consumer preferences; Economic instability impacting discretionary spending; Rising operational costs including rent and labor."
          },
          strategies: [
            "Focus on customer retention through loyalty programs and exceptional service",
            "Expansion of service offerings to include trending treatments",
            "Investment in digital marketing and online booking platforms",
            "Continuous training and development for stylists",
            "Strategic partnerships to enhance brand visibility"
          ]
        }
      ]
    };

    this.marketReports.set(sampleReport.id, sampleReport);
  }

  async getMarketReport(id: string): Promise<MarketReport | undefined> {
    return this.marketReports.get(id);
  }

  async getAllMarketReports(): Promise<MarketReport[]> {
    return Array.from(this.marketReports.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getMarketReportsByUserId(userId: string): Promise<MarketReport[]> {
    return Array.from(this.marketReports.values()).filter(
      (report) => report.userId === userId
    ).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
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
      region: insertReport.region || null,
      requestId: insertReport.requestId || null,
      userId: insertReport.userId || null,
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
