import { useState } from "react";
import { MarketReport } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Star, AlertTriangle } from "lucide-react";

interface StrategicAnalysisProps {
  report: MarketReport;
}

type TabType = "swot" | "pestel" | "porter";

export default function StrategicAnalysis({ report }: StrategicAnalysisProps) {
  const [activeTab, setActiveTab] = useState<TabType>("swot");
  const marketGrowthTrends = report.marketGrowthTrends;

  if (!marketGrowthTrends) {
    return (
      <Card className="rounded-xl border border-border shadow-sm mb-8" data-testid="section-strategic-analysis">
        <div className="border-b border-border">
          <nav className="flex space-x-8 p-6">
            <Button
              variant="ghost"
              className="text-primary border-b-2 border-primary pb-2 font-medium text-sm"
              onClick={() => setActiveTab("swot")}
              data-testid="tab-swot"
            >
              SWOT Analysis
            </Button>
          </nav>
        </div>
        <div className="p-6 text-center py-8">
          <p className="text-muted-foreground">Strategic analysis data is not available for this report.</p>
        </div>
      </Card>
    );
  }

  const { swotAnalysis, pestelAnalysis, porterAnalysis } = marketGrowthTrends;

  const renderSWOTAnalysis = () => (
    <div className="p-6" data-testid="content-swot">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-secondary mb-2 flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Strengths
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-strengths">
              {swotAnalysis?.strengths || "Strengths data not available"}
            </p>
          </div>
          
          <div className="bg-accent/10 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-2 flex items-center">
              <Star className="mr-2 h-4 w-4" />
              Opportunities
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-opportunities">
              {swotAnalysis?.opportunities || "Opportunities data not available"}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <h4 className="font-semibold text-destructive mb-2 flex items-center">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Weaknesses
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-weaknesses">
              {swotAnalysis?.weaknesses || "Weaknesses data not available"}
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-muted-foreground mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Threats
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-threats">
              {swotAnalysis?.threats || "Threats data not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPESTELAnalysis = () => (
    <div className="p-6" data-testid="content-pestel">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Political</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.political || "N/A"}</p>
        </div>
        <div className="bg-secondary/10 p-4 rounded-lg">
          <h4 className="font-semibold text-secondary mb-2">Economic</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.economic || "N/A"}</p>
        </div>
        <div className="bg-accent/10 p-4 rounded-lg">
          <h4 className="font-semibold text-accent mb-2">Social</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.social || "N/A"}</p>
        </div>
        <div className="bg-chart-4/10 p-4 rounded-lg">
          <h4 className="font-semibold text-chart-4 mb-2">Technological</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.technological || "N/A"}</p>
        </div>
        <div className="bg-chart-2/10 p-4 rounded-lg">
          <h4 className="font-semibold text-chart-2 mb-2">Environmental</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.environmental || "N/A"}</p>
        </div>
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h4 className="font-semibold text-destructive mb-2">Legal</h4>
          <p className="text-sm text-muted-foreground">{pestelAnalysis?.legal || "N/A"}</p>
        </div>
      </div>
    </div>
  );

  const renderPorterAnalysis = () => (
    <div className="p-6" data-testid="content-porter">
      <div className="space-y-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Competitive Rivalry</h4>
          <p className="text-sm text-muted-foreground">{porterAnalysis?.competitiveRivalry || "N/A"}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-secondary mb-2">Supplier Power</h4>
            <p className="text-sm text-muted-foreground">{porterAnalysis?.supplierPower || "N/A"}</p>
          </div>
          <div className="bg-accent/10 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-2">Buyer Power</h4>
            <p className="text-sm text-muted-foreground">{porterAnalysis?.buyerPower || "N/A"}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-chart-4/10 p-4 rounded-lg">
            <h4 className="font-semibold text-chart-4 mb-2">Threat of Substitution</h4>
            <p className="text-sm text-muted-foreground">{porterAnalysis?.threatOfSubstitution || "N/A"}</p>
          </div>
          <div className="bg-destructive/10 p-4 rounded-lg">
            <h4 className="font-semibold text-destructive mb-2">Threat of New Entrants</h4>
            <p className="text-sm text-muted-foreground">{porterAnalysis?.threatOfNewEntrants || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="rounded-xl border border-border shadow-sm mb-8" data-testid="section-strategic-analysis">
      <div className="border-b border-border">
        <nav className="flex space-x-8 p-6">
          <Button
            variant="ghost"
            className={activeTab === "swot" 
              ? "text-primary border-b-2 border-primary pb-2 font-medium text-sm transition-colors" 
              : "text-muted-foreground hover:text-foreground pb-2 font-medium text-sm transition-colors"
            }
            onClick={() => setActiveTab("swot")}
            data-testid="tab-swot"
          >
            SWOT Analysis
          </Button>
          {pestelAnalysis && (
            <Button
              variant="ghost"
              className={activeTab === "pestel" 
                ? "text-primary border-b-2 border-primary pb-2 font-medium text-sm transition-colors" 
                : "text-muted-foreground hover:text-foreground pb-2 font-medium text-sm transition-colors"
              }
              onClick={() => setActiveTab("pestel")}
              data-testid="tab-pestel"
            >
              PESTEL Analysis
            </Button>
          )}
          {porterAnalysis && (
            <Button
              variant="ghost"
              className={activeTab === "porter" 
                ? "text-primary border-b-2 border-primary pb-2 font-medium text-sm transition-colors" 
                : "text-muted-foreground hover:text-foreground pb-2 font-medium text-sm transition-colors"
              }
              onClick={() => setActiveTab("porter")}
              data-testid="tab-porter"
            >
              Porter's 5 Forces
            </Button>
          )}
        </nav>
      </div>
      
      {activeTab === "swot" && renderSWOTAnalysis()}
      {activeTab === "pestel" && renderPESTELAnalysis()}
      {activeTab === "porter" && renderPorterAnalysis()}
    </Card>
  );
}
