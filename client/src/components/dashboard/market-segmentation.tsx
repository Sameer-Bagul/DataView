import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Scissors, Users, MapPin } from "lucide-react";

interface MarketSegmentationProps {
  report: MarketReport;
}

export default function MarketSegmentation({ report }: MarketSegmentationProps) {
  const marketSegmentation = report.marketSegmentation;

  // Prepare service types data for pie chart
  const serviceTypesData = marketSegmentation?.byProductType 
    ? Object.entries(marketSegmentation.byProductType).map(([key, value]) => ({
        name: key,
        value: key === 'Haircut' ? 35 : key === 'HairColoring' ? 30 : 20, // Sample distribution
        description: value
      }))
    : [
        { name: 'Haircuts', value: 35, description: 'Basic and Trendy Cuts' },
        { name: 'Hair Coloring', value: 30, description: 'Permanent, Semi-Permanent, Highlights' },
        { name: 'Treatments', value: 20, description: 'Hair treatments and therapies' },
        { name: 'Styling', value: 15, description: 'Hair styling services' },
      ];

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];

  // Customer segments data
  const customerSegments = marketSegmentation?.byApplication 
    ? Object.entries(marketSegmentation.byApplication).map(([key, value], index) => ({
        name: key,
        description: value,
        percentage: key === 'Personal' ? 65 : 35 // Sample data
      }))
    : [
        { name: 'Personal', description: 'Individuals seeking routine grooming', percentage: 65 },
        { name: 'Special Occasion', description: 'Weddings, Parties, and Events', percentage: 35 },
      ];

  // Regional data
  const regionalData = marketSegmentation?.byRegion
    ? Object.entries(marketSegmentation.byRegion).map(([key, value], index) => ({
        name: key,
        description: value,
        marketShare: key === 'KoregaonPark' ? 40 : 35 // Sample data
      }))
    : [
        { name: 'Koregaon Park', description: 'Upscale Salons', marketShare: 40 },
        { name: 'Hinjewadi', description: 'Salons catering to IT professionals', marketShare: 35 },
      ];

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8" data-testid="section-market-segmentation">
      {/* Service Types */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Scissors className="text-primary mr-3" />
          Service Types
        </h3>
        <div className="h-48" data-testid="chart-service-types">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceTypesData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {serviceTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Market Share']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Customer Segments */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Users className="text-secondary mr-3" />
          Customer Segments
        </h3>
        <div className="space-y-4" data-testid="section-customer-segments">
          {customerSegments.map((segment, index) => (
            <div key={index} data-testid={`segment-${index}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">{segment.name}</span>
                <span className="text-sm font-medium" data-testid={`segment-percentage-${index}`}>
                  {segment.percentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className={index === 0 ? "bg-primary h-2 rounded-full" : "bg-secondary h-2 rounded-full"}
                  style={{ width: `${segment.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{segment.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Regional Distribution */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <MapPin className="text-accent mr-3" />
          Regional Focus
        </h3>
        <div className="space-y-4" data-testid="section-regional-distribution">
          {regionalData.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg" data-testid={`region-${index}`}>
              <div>
                <div className="font-medium text-foreground" data-testid={`region-name-${index}`}>
                  {region.name}
                </div>
                <div className="text-xs text-muted-foreground">{region.description}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${index === 0 ? 'text-primary' : 'text-secondary'}`} data-testid={`region-share-${index}`}>
                  {region.marketShare}%
                </div>
                <div className="text-xs text-muted-foreground">Market Share</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
