import { Button } from "@/components/ui/button";
import { ChartLine, Download, Circle } from "lucide-react";

export default function Header() {
  const handleExportReport = () => {
    // TODO: Implement report export functionality
    console.log("Export report clicked");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" data-testid="header-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChartLine className="text-primary-foreground text-sm" />
              </div>
              <h1 className="text-xl font-bold text-foreground" data-testid="text-app-title">
                Market Research Dashboard
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground" data-testid="status-connection">
              <Circle className="w-2 h-2 text-secondary mr-2 inline fill-current" />
              Live Data Connected
            </div>
            <Button 
              onClick={handleExportReport}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-export-report"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
