export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12" data-testid="footer-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div data-testid="text-copyright">© 2025 Market Research Dashboard. All rights reserved.</div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span data-testid="text-powered-by">Powered by n8n Automation</span>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" data-testid="indicator-realtime"></div>
            <span data-testid="text-realtime-status">Real-time Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
