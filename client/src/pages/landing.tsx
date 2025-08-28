import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Market Insights Platform</h1>
          </div>
          <Button onClick={() => window.location.href = "/api/login"} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Comprehensive Market Research Platform
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Generate detailed market reports, analyze industry trends, and make data-driven business decisions 
          with our AI-powered market research platform.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-get-started"
          >
            Get Started
          </Button>
          <Button variant="outline" size="lg" data-testid="button-learn-more">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Comprehensive Reports</CardTitle>
              <CardDescription>
                Detailed market analysis including SWOT, PESTEL, and Porter's Five Forces analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Executive summaries</li>
                <li>• Market dynamics analysis</li>
                <li>• Competitor analysis</li>
                <li>• Growth projections</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-time Insights</CardTitle>
              <CardDescription>
                Access up-to-date market data and trends across various industries and regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Live market data</li>
                <li>• Industry benchmarks</li>
                <li>• Regional analysis</li>
                <li>• Trend forecasting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Expert Analysis</CardTitle>
              <CardDescription>
                Professional-grade market research backed by industry expertise and data science
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Professional reports</li>
                <li>• Data-driven insights</li>
                <li>• Strategic recommendations</li>
                <li>• Actionable findings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of businesses making smarter decisions with our market research platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg" 
              className="w-full max-w-md"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-start-now"
            >
              Start Your Market Research Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Secure authentication with Replit • No credit card required
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Market Insights Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}