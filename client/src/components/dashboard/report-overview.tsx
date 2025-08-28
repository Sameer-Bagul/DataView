import { MarketReport } from "@shared/schema";

interface ReportOverviewProps {
  report: MarketReport;
}

export default function ReportOverview({ report }: ReportOverviewProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mb-8" data-testid="section-report-overview">
      <div className="gradient-bg rounded-xl p-6 text-white mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2" data-testid="text-industry-name">
              {report.industryName} Industry Analysis
            </h2>
            <p className="text-white/80 mb-4" data-testid="text-report-scope">
              {report.region ? `${report.region} Region • ` : ""}{report.reportScope} Report
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm" data-testid="badge-company-type">
                {report.companyType}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm" data-testid="badge-report-scope">
                {report.reportScope}
              </span>
              {report.formMode && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm" data-testid="badge-form-mode">
                  {report.formMode}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-white/80 text-sm">Report Generated</div>
            <div className="text-lg font-semibold" data-testid="text-submission-date">
              {formatDate(report.submittedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
