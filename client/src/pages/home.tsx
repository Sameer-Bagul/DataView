import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Market Insights Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.firstName || user?.email || 'User'}!
            </span>
            <Button 
              variant="outline"
              onClick={() => window.location.href = "/api/logout"}
              data-testid="button-logout"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your market research reports and generate new insights
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Generate Report</CardTitle>
              <CardDescription>Create a new market research report</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/generate-report">
                <Button className="w-full" data-testid="button-generate-report">
                  Generate Report
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">View Reports</CardTitle>
              <CardDescription>Browse your existing reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/reports">
                <Button variant="outline" className="w-full" data-testid="button-view-reports">
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Market Trends</CardTitle>
              <CardDescription>Explore market trends and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled data-testid="button-market-trends">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Industry Analysis</CardTitle>
              <CardDescription>Deep dive into industry analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled data-testid="button-industry-analysis">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest market research activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Generate your first report to get started</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}