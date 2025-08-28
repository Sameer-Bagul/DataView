import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";

interface ExecutiveSummaryProps {
  report: MarketReport;
}

export default function ExecutiveSummary({ report }: ExecutiveSummaryProps) {
  const executiveSummary = report.executiveSummary;

  if (!executiveSummary) {
    return (
      <Card className="rounded-xl border border-border p-6 mb-8 shadow-sm" data-testid="section-executive-summary">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <FileText className="text-primary mr-3" />
          Executive Summary
        </h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Executive summary data is not available for this report.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border border-border p-6 mb-8 shadow-sm" data-testid="section-executive-summary">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <FileText className="text-primary mr-3" />
        Executive Summary
      </h3>
      <div className="prose max-w-none">
        <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-market-attractiveness">
          {executiveSummary.marketAttractiveness}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Key Findings</h4>
            <ul className="space-y-2" data-testid="list-key-findings">
              {executiveSummary.keyFindings?.map((finding, index) => (
                <li key={index} className="flex items-start" data-testid={`finding-${index}`}>
                  <CheckCircle className="text-secondary mr-3 mt-1 h-4 w-4 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Future Projections</h4>
            <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-future-projections">
              {executiveSummary.futureProjections}
            </p>
            
            {executiveSummary.historicalAnalysis && (
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-3">Historical Analysis</h4>
                <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-historical-analysis">
                  {executiveSummary.historicalAnalysis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
