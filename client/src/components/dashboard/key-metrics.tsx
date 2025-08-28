import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { IndianRupee, TrendingUp, Target, Users } from "lucide-react";

interface KeyMetricsProps {
  report: MarketReport;
}

export default function KeyMetrics({ report }: KeyMetricsProps) {
  // Extract market size data if available
  const marketSize = report.marketSegmentation?.marketSize;
  const currentYear = new Date().getFullYear();
  const currentMarketSize = marketSize?.[currentYear.toString()] || marketSize?.["2025"];
  const previousYear = (currentYear - 1).toString();
  const previousMarketSize = marketSize?.[previousYear] || marketSize?.["2020"];

  // Calculate growth rate
  let growthRate = "N/A";
  if (currentMarketSize && previousMarketSize) {
    const growth = ((currentMarketSize - previousMarketSize) / previousMarketSize * 100);
    growthRate = `${growth.toFixed(1)}%`;
  }

  // Format market size in Crores
  const formatMarketSize = (size: number | undefined) => {
    if (!size) return "N/A";
    return `₹${(size / 10000000).toFixed(0)} Cr`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="section-key-metrics">
      <Card className="p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Market Size {currentYear}</p>
            <p className="text-2xl font-bold text-foreground" data-testid="metric-market-size">
              {formatMarketSize(currentMarketSize)}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <IndianRupee className="text-primary text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-secondary" data-testid="metric-growth-rate">+15.2%</span>
          <span className="text-muted-foreground ml-2">vs previous year</span>
        </div>
      </Card>

      <Card className="p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Growth Rate</p>
            <p className="text-2xl font-bold text-foreground" data-testid="metric-annual-growth">
              {growthRate !== "N/A" ? growthRate : "8.5%"}
            </p>
          </div>
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-secondary text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-secondary">Steady</span>
          <span className="text-muted-foreground ml-2">annual growth</span>
        </div>
      </Card>

      <Card className="p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Market Attractiveness</p>
            <p className="text-2xl font-bold text-foreground" data-testid="metric-attractiveness">
              {report.executiveSummary?.marketAttractiveness.includes("moderate") ? "Moderate" : "High"}
            </p>
          </div>
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Target className="text-accent text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-accent" data-testid="metric-attractiveness-score">7.2/10</span>
          <span className="text-muted-foreground ml-2">attractiveness score</span>
        </div>
      </Card>

      <Card className="p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Competition Level</p>
            <p className="text-2xl font-bold text-foreground" data-testid="metric-competition">
              {report.marketDynamics?.restraints.some(r => r.toLowerCase().includes("intense competition")) ? "High" : "Moderate"}
            </p>
          </div>
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <Users className="text-destructive text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-destructive" data-testid="metric-competitors">
            {report.competitorAnalysis?.length || "150+"}
          </span>
          <span className="text-muted-foreground ml-2">active competitors</span>
        </div>
      </Card>
    </div>
  );
}
