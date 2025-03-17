
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import CandidateTable from "@/components/CandidateTable";
import { Search } from "lucide-react";

// Mocked data
const mockCandidates = [
  { id: "1", name: "Emma Thompson", position: "Product Manager", date: "May 15, 2023", status: "reviewed" as const, score: 87 },
  { id: "2", name: "Michael Chen", position: "UX Designer", date: "May 16, 2023", status: "completed" as const, score: 92 },
  { id: "3", name: "Sarah Johnson", position: "Software Engineer", date: "May 17, 2023", status: "pending" as const },
  { id: "4", name: "David Williams", position: "Data Analyst", date: "May 18, 2023", status: "pending" as const },
  { id: "5", name: "Alex Rodriguez", position: "Marketing Manager", date: "May 19, 2023", status: "reviewed" as const, score: 78 },
  { id: "6", name: "Jessica Lee", position: "Product Manager", date: "May 20, 2023", status: "completed" as const, score: 84 },
  { id: "7", name: "Ryan Garcia", position: "UX Designer", date: "May 21, 2023", status: "reviewed" as const, score: 95 },
  { id: "8", name: "Olivia Parker", position: "Software Engineer", date: "May 22, 2023", status: "completed" as const, score: 89 },
];

const competencyData = [
  { competency: "Communication", score: 85 },
  { competency: "Problem Solving", score: 92 },
  { competency: "Leadership", score: 78 },
  { competency: "Technical Knowledge", score: 88 },
  { competency: "Cultural Fit", score: 90 },
];

const radarData = [
  {
    subject: "Communication",
    candidate: 85,
    average: 70,
  },
  {
    subject: "Problem Solving",
    candidate: 92,
    average: 75,
  },
  {
    subject: "Leadership",
    candidate: 78,
    average: 68,
  },
  {
    subject: "Technical",
    candidate: 88,
    average: 80,
  },
  {
    subject: "Cultural Fit",
    candidate: 90,
    average: 82,
  },
];

const timeSeriesData = [
  { name: "Q1", value: 78 },
  { name: "Q2", value: 82 },
  { name: "Q3", value: 76 },
  { name: "Q4", value: 89 },
  { name: "Q5", value: 94 },
  { name: "Q6", value: 85 },
  { name: "Q7", value: 91 },
  { name: "Q8", value: 87 },
];

const strengthsAndWeaknesses = [
  { type: "strength", text: "Excellent communication skills with clear articulation of complex ideas" },
  { type: "strength", text: "Strong problem-solving approach with structured methodology" },
  { type: "strength", text: "Good understanding of product development lifecycle" },
  { type: "weakness", text: "Could improve on delegation and team empowerment" },
  { type: "weakness", text: "Sometimes overly cautious when making decisions" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white rounded-md shadow-md border text-xs">
        <p className="font-medium">{`${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const CandidateAnalysis = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCandidates = mockCandidates.filter(
    (candidate) => 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const currentCandidate = mockCandidates.find(candidate => candidate.id === selectedCandidate);

  const handleViewCandidate = (id: string) => {
    setSelectedCandidate(id);
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <header className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-primary">Candidate Analysis</span>
          <h1 className="text-2xl font-semibold tracking-tight">AI-Generated Insights</h1>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <DashboardCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Candidates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CandidateTable 
                candidates={filteredCandidates}
                showScore={true}
                onView={handleViewCandidate}
              />
            </CardContent>
          </DashboardCard>
        </div>

        {selectedCandidate && currentCandidate && (
          <div className="lg:col-span-2 space-y-6">
            <DashboardCard>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <Badge className="mb-1" variant="outline">
                    {currentCandidate.position}
                  </Badge>
                  <CardTitle className="text-xl font-semibold">
                    {currentCandidate.name}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Interview Date</div>
                  <div className="font-medium">{currentCandidate.date}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Overall Score</div>
                      <div className="text-2xl font-bold">{currentCandidate.score || "N/A"}</div>
                    </div>
                    {currentCandidate.score && (
                      <Progress value={currentCandidate.score} className="h-2" />
                    )}
                  </div>

                  <Tabs defaultValue="competencies">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="competencies">Competencies</TabsTrigger>
                      <TabsTrigger value="timeline">Response Timeline</TabsTrigger>
                    </TabsList>
                    <TabsContent value="competencies" className="space-y-4 pt-4">
                      <div className="h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={competencyData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="competency" type="category" width={140} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="timeline" className="pt-4">
                      <div className="h-[240px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" />
                            <YAxis domain={[50, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2} 
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Confidence level over time during the interview
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </DashboardCard>

            <div className="grid gap-6 md:grid-cols-2">
              <DashboardCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Competency Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="rgba(0,0,0,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar 
                          name="Candidate" 
                          dataKey="candidate" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.3} 
                        />
                        <Radar 
                          name="Average" 
                          dataKey="average" 
                          stroke="rgba(0,0,0,0.2)" 
                          fill="rgba(0,0,0,0.1)" 
                          fillOpacity={0.3} 
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </DashboardCard>

              <DashboardCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-green-600 mb-2">Strengths</h3>
                      <ul className="space-y-2">
                        {strengthsAndWeaknesses
                          .filter((item) => item.type === "strength")
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                              <span>{item.text}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-amber-600 mb-2">Areas for Improvement</h3>
                      <ul className="space-y-2">
                        {strengthsAndWeaknesses
                          .filter((item) => item.type === "weakness")
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                              <span>{item.text}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </DashboardCard>
            </div>

            <DashboardCard>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/5 rounded-lg backdrop-blur-sm border border-primary/10">
                  <p className="text-sm">
                    Based on the interview performance, {currentCandidate.name} demonstrates strong 
                    product management skills and excellent communication abilities. The candidate shows 
                    a deep understanding of user-centered design principles and data-driven decision making.
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10">
                    <div className="text-sm font-medium">Hiring Recommendation</div>
                    <Badge variant="secondary" className="font-medium">
                      Strongly Recommend
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </DashboardCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateAnalysis;
