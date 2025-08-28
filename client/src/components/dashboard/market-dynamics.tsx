import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Rocket, AlertTriangle, Plus, Lightbulb, Minus, AlertCircle } from "lucide-react";

interface MarketDynamicsProps {
  report: MarketReport;
}

export default function MarketDynamics({ report }: MarketDynamicsProps) {
  const marketDynamics = report.marketDynamics;

  if (!marketDynamics) {
    return (
      <div className="grid lg:grid-cols-2 gap-6 mb-8" data-testid="section-market-dynamics">
        <Card className="p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Rocket className="text-secondary mr-3" />
            Drivers & Opportunities
          </h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Market dynamics data is not available for this report.</p>
          </div>
        </Card>
        
        <Card className="p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="text-destructive mr-3" />
            Restraints & Challenges
          </h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Market dynamics data is not available for this report.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8" data-testid="section-market-dynamics">
      {/* Drivers & Opportunities */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Rocket className="text-secondary mr-3" />
          Drivers & Opportunities
        </h3>
        
        <div className="space-y-4">
          {marketDynamics.drivers && marketDynamics.drivers.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 text-secondary">Market Drivers</h4>
              <ul className="space-y-2" data-testid="list-market-drivers">
                {marketDynamics.drivers.map((driver, index) => (
                  <li key={index} className="flex items-start text-sm" data-testid={`driver-${index}`}>
                    <Plus className="text-secondary mr-2 mt-1 h-3 w-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {marketDynamics.opportunities && marketDynamics.opportunities.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 text-accent">Opportunities</h4>
              <ul className="space-y-2" data-testid="list-opportunities">
                {marketDynamics.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start text-sm" data-testid={`opportunity-${index}`}>
                    <Lightbulb className="text-accent mr-2 mt-1 h-3 w-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Restraints & Challenges */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <AlertTriangle className="text-destructive mr-3" />
          Restraints & Challenges
        </h3>
        
        <div className="space-y-4">
          {marketDynamics.restraints && marketDynamics.restraints.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 text-destructive">Market Restraints</h4>
              <ul className="space-y-2" data-testid="list-market-restraints">
                {marketDynamics.restraints.map((restraint, index) => (
                  <li key={index} className="flex items-start text-sm" data-testid={`restraint-${index}`}>
                    <Minus className="text-destructive mr-2 mt-1 h-3 w-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{restraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {marketDynamics.challenges && marketDynamics.challenges.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 text-destructive">Key Challenges</h4>
              <ul className="space-y-2" data-testid="list-challenges">
                {marketDynamics.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-sm" data-testid={`challenge-${index}`}>
                    <AlertCircle className="text-destructive mr-2 mt-1 h-3 w-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
