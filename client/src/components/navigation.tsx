import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChartLine, FileText, Plus, LogOut, User } from "lucide-react";
import { User as UserType } from "@shared/schema";

export default function Navigation() {
  const [user, setUser] = useState<UserType | null>(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLocation("/login");
  };

  const isActive = (path: string) => {
    return location === path || (path === "/reports" && location.startsWith("/dashboard"));
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" data-testid="navigation-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/reports" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChartLine className="text-primary-foreground text-sm" />
              </div>
              <span className="text-xl font-bold text-foreground">Market Insights</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/reports">
                <Button 
                  variant={isActive("/reports") ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  data-testid="nav-reports"
                >
                  <FileText className="h-4 w-4" />
                  Reports
                </Button>
              </Link>
              <Link href="/generate-report">
                <Button 
                  variant={isActive("/generate-report") ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  data-testid="nav-generate"
                >
                  <Plus className="h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-muted-foreground" data-testid="text-welcome">
              Welcome, {user.name}
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium" data-testid="text-user-name">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground" data-testid="text-user-email">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="md:hidden">
                  <Link href="/reports" className="flex items-center gap-2" data-testid="mobile-nav-reports">
                    <FileText className="h-4 w-4" />
                    Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="md:hidden">
                  <Link href="/generate-report" className="flex items-center gap-2" data-testid="mobile-nav-generate">
                    <Plus className="h-4 w-4" />
                    Generate Report
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}