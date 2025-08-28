import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, FileText, Calendar, MapPin, Building2 } from "lucide-react";
import { MarketReport } from "@shared/schema";

export default function Reports() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: reports, isLoading, error } = useQuery<MarketReport[]>({
    queryKey: ["/api/market-reports", user.id],
    enabled: !!user.id,
  });

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'processing': return 'default';
      case 'pending': return 'outline';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-reports-title">
            Market Research Reports
          </h1>
          <p className="text-muted-foreground mt-2" data-testid="text-reports-description">
            Access your generated market insights and analysis reports
          </p>
        </div>
        <Link href="/generate-report">
          <Button className="flex items-center gap-2" data-testid="button-generate-report">
            <Plus className="h-4 w-4" />
            Generate Custom Report
          </Button>
        </Link>
      </div>

      {!reports || reports.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2" data-testid="text-no-reports">
              No Reports Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              You haven't generated any market research reports yet. Click the button below to create your first report.
            </p>
            <Link href="/generate-report">
              <Button data-testid="button-create-first-report">
                <Plus className="h-4 w-4 mr-2" />
                Generate Your First Report
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-reports">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow" data-testid={`card-report-${report.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold" data-testid={`text-report-title-${report.id}`}>
                    {report.industryName} Industry
                  </CardTitle>
                  <Badge variant={getStatusColor("completed")} data-testid={`badge-status-${report.id}`}>
                    Completed
                  </Badge>
                </div>
                <CardDescription data-testid={`text-report-description-${report.id}`}>
                  {report.reportScope} analysis for {report.companyType.toLowerCase()} businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span data-testid={`text-report-date-${report.id}`}>
                      Generated {formatDate(report.createdAt || report.submittedAt)}
                    </span>
                  </div>
                  {report.region && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span data-testid={`text-report-region-${report.id}`}>{report.region}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span data-testid={`text-report-type-${report.id}`}>{report.companyType}</span>
                  </div>
                  
                  <div className="pt-3">
                    <Link href={`/dashboard/${report.id}`}>
                      <Button variant="outline" className="w-full" data-testid={`button-view-report-${report.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}