import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Header from "@/components/dashboard/header";
import ReportOverview from "@/components/dashboard/report-overview";
import KeyMetrics from "@/components/dashboard/key-metrics";
import ExecutiveSummary from "@/components/dashboard/executive-summary";
import MarketSizeChart from "@/components/dashboard/market-size-chart";
import MarketDynamics from "@/components/dashboard/market-dynamics";
import StrategicAnalysis from "@/components/dashboard/strategic-analysis";
import MarketSegmentation from "@/components/dashboard/market-segmentation";
import CompetitorAnalysis from "@/components/dashboard/competitor-analysis";
import Footer from "@/components/dashboard/footer";
import { MarketReport } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function Dashboard() {
  const [match, params] = useRoute("/dashboard/:id");
  const reportId = params?.id;

  // If no specific report ID, get the latest report
  const { data: reports, isLoading: reportsLoading, error: reportsError } = useQuery<MarketReport[]>({
    queryKey: ["/api/market-reports"],
    enabled: !reportId,
  });

  // Get specific report if ID is provided
  const { data: specificReport, isLoading: specificLoading, error: specificError } = useQuery<MarketReport>({
    queryKey: ["/api/market-reports", reportId],
    enabled: !!reportId,
  });

  const isLoading = reportId ? specificLoading : reportsLoading;
  const error = reportId ? specificError : reportsError;
  const report = reportId ? specificReport : (reports && reports.length > 0 ? reports[0] : null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-8 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2 items-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <h1 className="text-2xl font-bold text-foreground">Error Loading Data</h1>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "Failed to load market research data"}
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No Market Research Data Available</h2>
                <p className="text-muted-foreground mb-6">
                  No market research reports have been generated yet. Data will appear here once n8n workflows submit research data.
                </p>
                <div className="bg-muted px-4 py-2 rounded-lg inline-block">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    Waiting for n8n webhook data...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportOverview report={report} />
        <KeyMetrics report={report} />
        <ExecutiveSummary report={report} />
        <MarketSizeChart report={report} />
        <MarketDynamics report={report} />
        <StrategicAnalysis report={report} />
        <MarketSegmentation report={report} />
        <CompetitorAnalysis report={report} />
      </main>
      <Footer />
    </div>
  );
}
