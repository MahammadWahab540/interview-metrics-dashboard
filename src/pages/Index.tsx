
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MetricCard from "@/components/MetricCard";
import DashboardCard from "@/components/DashboardCard";
import CandidateTable from "@/components/CandidateTable";
import { BarChartHorizontal, CalendarDays, ChevronRight, ClipboardCheck, Link as LinkIcon, Plus, Users } from "lucide-react";

// Mocked data
const mockCandidates = [
  { id: "1", name: "Emma Thompson", position: "Product Manager", date: "May 15, 2023", status: "reviewed" as const, score: 87 },
  { id: "2", name: "Michael Chen", position: "UX Designer", date: "May 16, 2023", status: "completed" as const, score: 92 },
  { id: "3", name: "Sarah Johnson", position: "Software Engineer", date: "May 17, 2023", status: "pending" as const },
  { id: "4", name: "David Williams", position: "Data Analyst", date: "May 18, 2023", status: "pending" as const },
];

const recentActivities = [
  { id: "1", text: "Emma Thompson's interview has been reviewed", time: "2 hours ago" },
  { id: "2", text: "Michael Chen completed the interview", time: "4 hours ago" },
  { id: "3", text: "New interview link generated for Sarah Johnson", time: "1 day ago" },
  { id: "4", text: "David Williams has been invited to interview", time: "1 day ago" },
];

const Index = () => {
  const [candidates] = useState(mockCandidates);
  
  const handleViewCandidate = (id: string) => {
    console.log("View candidate:", id);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto animate-fade-in">
      <header className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-primary">Dashboard</span>
          <h1 className="text-2xl font-semibold tracking-tight">Interview Platform</h1>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard 
          title="Total Candidates" 
          value="124"
          description="21 interviews this month"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard 
          title="Pending Interviews" 
          value="18"
          description="8 scheduled for next week"
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <MetricCard 
          title="Completed Interviews" 
          value="106"
          description="87 reviewed by HR"
          icon={<ClipboardCheck className="h-4 w-4" />}
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-7">
        <div className="md:col-span-4">
          <DashboardCard className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Recent Candidates</CardTitle>
              <Link to="/candidate-analysis">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <CandidateTable 
                candidates={candidates}
                showScore={true}
                onView={handleViewCandidate}
              />
            </CardContent>
          </DashboardCard>
        </div>
        
        <div className="md:col-span-3 grid gap-6 content-start">
          <DashboardCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Link to="/interview-management">
                <Button className="w-full justify-start shadow-sm" size="lg">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Generate Interview Link
                </Button>
              </Link>
              <Link to="/candidate-analysis">
                <Button className="w-full justify-start shadow-sm" variant="outline" size="lg">
                  <BarChartHorizontal className="mr-2 h-4 w-4" />
                  View Candidate Analytics
                </Button>
              </Link>
            </CardContent>
          </DashboardCard>
          
          <DashboardCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="link" size="sm" className="text-primary p-0">
                  View all activity
                </Button>
              </div>
            </CardContent>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
