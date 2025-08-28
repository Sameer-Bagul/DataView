import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { generateReportSchema, type GenerateReportData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function GenerateReport() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<GenerateReportData>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      industryName: "",
      companyType: "Individual",
      reportScope: "Global",
      region: "",
      formMode: "basic",
    },
  });

  const watchReportScope = form.watch("reportScope");

  const generateMutation = useMutation({
    mutationFn: (data: GenerateReportData) => apiRequest("/api/reports/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/market-reports"] });
      toast({
        title: "Report generation started",
        description: "Your market research report is being generated. You'll be redirected to track progress.",
      });
      setLocation("/reports");
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to start report generation",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GenerateReportData) => {
    generateMutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4" data-testid="link-back-reports">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-generate-title">
          Generate Custom Market Research Report
        </h1>
        <p className="text-muted-foreground mt-2" data-testid="text-generate-description">
          Fill in the details below to generate a comprehensive market analysis report powered by AI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="text-form-title">
            <Sparkles className="h-5 w-5 text-primary" />
            Report Parameters
          </CardTitle>
          <CardDescription data-testid="text-form-description">
            Provide details about the industry and scope for your market research analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-generate-report">
              <FormField
                control={form.control}
                name="Industry Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Hair Salon, Mobile Hardware, Food & Beverage"
                        {...field}
                        data-testid="input-industry-name"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the specific industry you want to analyze
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Your Company Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-company-type">
                          <SelectValue placeholder="Select your company type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="SME">SME (Small & Medium Enterprise)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type that best describes your business
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Report Study Scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Study Scope *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-report-scope">
                          <SelectValue placeholder="Select the scope of analysis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="Regional">Regional</SelectItem>
                        <SelectItem value="Locality Specific">Locality Specific</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the geographical scope for your market analysis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(watchReportScope === "Regional" || watchReportScope === "Locality Specific") && (
                <FormField
                  control={form.control}
                  name="Region name (if Regional report)"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {watchReportScope === "Regional" ? "Region Name *" : "Location Name *"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            watchReportScope === "Regional" 
                              ? "e.g., Asia Pacific, North America, Europe"
                              : "e.g., Mumbai, Pune, Delhi, Bangalore"
                          }
                          {...field}
                          data-testid="input-region-name"
                        />
                      </FormControl>
                      <FormDescription>
                        {watchReportScope === "Regional" 
                          ? "Specify the region for analysis"
                          : "Specify the city or locality for analysis"
                        }
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="formMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-form-mode">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="production">Production (Full Analysis)</SelectItem>
                        <SelectItem value="test">Test (Quick Overview)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose production for comprehensive analysis or test for quick insights
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-6">
                <Link href="/reports" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" data-testid="button-cancel">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={generateMutation.isPending}
                  data-testid="button-generate"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/30">
        <CardContent className="pt-6">
          <h3 className="font-medium text-foreground mb-2">What you'll get:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Executive summary with market attractiveness analysis</li>
            <li>• Market dynamics including drivers, restraints, and opportunities</li>
            <li>• Strategic analysis with SWOT, PESTEL, and Porter's 5 Forces</li>
            <li>• Market segmentation and size projections</li>
            <li>• Comprehensive competitor analysis</li>
            <li>• Interactive charts and visualizations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}