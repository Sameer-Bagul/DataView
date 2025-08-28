import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

interface MarketSizeChartProps {
  report: MarketReport;
}

export default function MarketSizeChart({ report }: MarketSizeChartProps) {
  // Prepare chart data from market segmentation
  const marketSize = report.marketSegmentation?.marketSize;
  
  const chartData = marketSize 
    ? Object.entries(marketSize).map(([year, size]) => ({
        year,
        marketSize: size / 10000000, // Convert to Crores
      })).sort((a, b) => parseInt(a.year) - parseInt(b.year))
    : [
        { year: '2020', marketSize: 15 },
        { year: '2021', marketSize: 16.2 },
        { year: '2022', marketSize: 17.5 },
        { year: '2023', marketSize: 19.1 },
        { year: '2024', marketSize: 20.8 },
        { year: '2025', marketSize: 22 },
        { year: '2026', marketSize: 24 },
        { year: '2027', marketSize: 26.5 },
        { year: '2028', marketSize: 28.8 },
        { year: '2029', marketSize: 30.2 },
        { year: '2030', marketSize: 30 },
      ];

  const formatTooltipValue = (value: number) => [`₹${value.toFixed(1)} Cr`, 'Market Size'];

  return (
    <Card className="rounded-xl border border-border p-6 mb-8 shadow-sm" data-testid="section-market-size-chart">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <BarChart3 className="text-primary mr-3" />
        Market Size Trends & Projections
      </h3>
      <div className="h-80 w-full" data-testid="chart-market-size">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMarketSize" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${value}Cr`}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Area
              type="monotone"
              dataKey="marketSize"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorMarketSize)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
