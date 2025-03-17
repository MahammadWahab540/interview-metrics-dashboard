
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { BarChartHorizontal, ChevronRight, ClipboardCheck, Home, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">AI</span>
            </div>
            <div className="font-medium text-lg">Interview Pro</div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={cn(
                "flex justify-between items-center py-3",
                isActivePath("/") && "bg-primary/5 text-primary font-medium",
                "transition-colors duration-200"
              )}>
                <Link to="/">
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-3" />
                    <span>Dashboard</span>
                  </span>
                  {isActivePath("/") && <ChevronRight className="h-4 w-4" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={cn(
                "flex justify-between items-center py-3",
                isActivePath("/interview-management") && "bg-primary/5 text-primary font-medium",
                "transition-colors duration-200"
              )}>
                <Link to="/interview-management">
                  <span className="flex items-center">
                    <ClipboardCheck className="h-4 w-4 mr-3" />
                    <span>Interview Management</span>
                  </span>
                  {isActivePath("/interview-management") && <ChevronRight className="h-4 w-4" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={cn(
                "flex justify-between items-center py-3",
                isActivePath("/candidate-analysis") && "bg-primary/5 text-primary font-medium",
                "transition-colors duration-200"
              )}>
                <Link to="/candidate-analysis">
                  <span className="flex items-center">
                    <BarChartHorizontal className="h-4 w-4 mr-3" />
                    <span>Candidate Analysis</span>
                  </span>
                  {isActivePath("/candidate-analysis") && <ChevronRight className="h-4 w-4" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center mr-3">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">HR Department</div>
                <div className="text-xs text-muted-foreground">Enterprise Co.</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <SidebarTrigger className="p-2 rounded-md bg-background border shadow-sm">
          <span className="sr-only">Toggle menu</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" />
          </svg>
        </SidebarTrigger>
      </div>
    </>
  );
};

export default Navbar;
