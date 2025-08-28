import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface CompetitorAnalysisProps {
  report: MarketReport;
}

export default function CompetitorAnalysis({ report }: CompetitorAnalysisProps) {
  const competitors = report.competitorAnalysis;

  if (!competitors || competitors.length === 0) {
    return (
      <Card className="rounded-xl border border-border p-6 shadow-sm mb-8" data-testid="section-competitor-analysis">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
          <Trophy className="text-primary mr-3" />
          Competitor Analysis
        </h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Competitor analysis data is not available for this report.</p>
        </div>
      </Card>
    );
  }

  const getMarketPositionColor = (competitor: any) => {
    const strengths = competitor.swot?.strengths?.toLowerCase() || '';
    if (strengths.includes('strong brand') || strengths.includes('brand recognition')) {
      return 'secondary';
    }
    return 'accent';
  };

  const getMarketPositionLabel = (competitor: any) => {
    const strengths = competitor.swot?.strengths?.toLowerCase() || '';
    if (strengths.includes('strong brand') || strengths.includes('brand recognition')) {
      return 'Strong';
    }
    return 'Moderate';
  };

  return (
    <Card className="rounded-xl border border-border p-6 shadow-sm mb-8" data-testid="section-competitor-analysis">
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Trophy className="text-primary mr-3" />
        Competitor Analysis
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full" data-testid="table-competitors">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Competitor</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Services</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Strengths</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Market Position</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor, index) => (
              <tr 
                key={index} 
                className="border-b border-border hover:bg-muted/50 transition-colors"
                data-testid={`competitor-row-${index}`}
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-foreground" data-testid={`competitor-name-${index}`}>
                    {competitor.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {competitor.name.includes('Salon') ? 'Salon Chain' : 'Premium Chain'}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1" data-testid={`competitor-services-${index}`}>
                    {competitor.products.slice(0, 3).map((service, serviceIndex) => {
                      let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                      if (service.toLowerCase().includes('hair')) variant = "default";
                      if (service.toLowerCase().includes('styling') || service.toLowerCase().includes('beauty')) variant = "secondary";
                      if (service.toLowerCase().includes('bridal')) variant = "destructive";
                      
                      return (
                        <Badge key={serviceIndex} variant={variant} className="text-xs">
                          {service.replace(/Hair/g, '').replace(/&/g, '').trim()}
                        </Badge>
                      );
                    })}
                    {competitor.products.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{competitor.products.length - 3}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs" data-testid={`competitor-strengths-${index}`}>
                  {competitor.swot?.strengths ? 
                    competitor.swot.strengths.split('.')[0] + (competitor.swot.strengths.includes('.') ? '...' : '') :
                    'Strengths not available'
                  }
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center" data-testid={`competitor-position-${index}`}>
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      getMarketPositionColor(competitor) === 'secondary' ? 'bg-secondary' : 'bg-accent'
                    }`}></div>
                    <span className="text-sm font-medium">
                      {getMarketPositionLabel(competitor)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
