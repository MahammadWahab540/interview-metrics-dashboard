import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Copy, Link, Mail, Play, Plus, RefreshCw, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardCard from "@/components/DashboardCard";
import { useNavigate } from "react-router-dom";

const mockQuestionCategories = [
  {
    id: "leadership",
    name: "Leadership",
    questions: [
      { id: "l1", text: "Describe a situation where you demonstrated leadership skills." },
      { id: "l2", text: "Tell me about a time when you had to make a difficult decision as a leader." },
      { id: "l3", text: "How do you motivate team members who are not performing well?" },
      { id: "l4", text: "Describe your leadership style and give an example of how it has been effective." },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    questions: [
      { id: "c1", text: "Describe a time when you had to explain a complex concept to someone." },
      { id: "c2", text: "Tell me about a situation where your communication skills made a difference." },
      { id: "c3", text: "How do you adapt your communication style for different audiences?" },
      { id: "c4", text: "Describe a time when you had to deliver difficult news to someone." },
    ],
  },
  {
    id: "analytical",
    name: "Analytical Skills",
    questions: [
      { id: "a1", text: "Describe a complex problem you solved using data analysis." },
      { id: "a2", text: "Tell me about a time when you had to make a decision with incomplete information." },
      { id: "a3", text: "How do you approach analyzing market trends and competitor data?" },
      { id: "a4", text: "Describe your process for solving analytical problems." },
    ],
  },
];

const InterviewManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [position, setPosition] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewLinks, setInterviewLinks] = useState<{link: string, position: string, candidate: string, date: string}[]>([]);

  const handleGenerateLink = () => {
    if (!position || !candidateName || selectedQuestions.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and select at least one question.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 10);
      const newLink = `https://interview.example.com/${randomId}`;
      setGeneratedLink(newLink);
      
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      setInterviewLinks(prev => [
        {
          link: newLink,
          position,
          candidate: candidateName,
          date: currentDate
        },
        ...prev
      ]);
      
      setIsGenerating(false);
      
      toast({
        title: "Link generated successfully",
        description: "The interview link has been created and is ready to share.",
      });
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    
    toast({
      title: "Link copied to clipboard",
      description: "You can now share it with the candidate.",
    });
  };

  const handleSendEmail = () => {
    if (!candidateEmail) {
      toast({
        title: "Missing email",
        description: "Please enter the candidate's email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Email sent successfully",
      description: `The interview link has been sent to ${candidateEmail}.`,
    });
  };

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions((prev) => 
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const resetForm = () => {
    setPosition("");
    setCandidateName("");
    setCandidateEmail("");
    setSelectedQuestions([]);
    setGeneratedLink("");
  };

  const handlePreviewInterview = (interviewLink: string) => {
    const interviewId = interviewLink.substring(interviewLink.lastIndexOf('/') + 1);
    navigate(`/interview-session/${interviewId}`);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto animate-fade-in">
      <header className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-primary">Interview Management</span>
          <h1 className="text-2xl font-semibold tracking-tight">Create & Manage Interviews</h1>
        </div>
      </header>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="create">Create Interview</TabsTrigger>
          <TabsTrigger value="manage">Manage Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <DashboardCard>
                <CardHeader>
                  <CardTitle>Interview Details</CardTitle>
                  <CardDescription>
                    Create a new AI interview for a candidate
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                      <Input
                        id="position"
                        placeholder="e.g. Product Manager"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidate-name">Candidate Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="candidate-name"
                        placeholder="e.g. John Smith"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidate-email">Candidate Email</Label>
                    <Input
                      id="candidate-email"
                      type="email"
                      placeholder="e.g. john.smith@example.com"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional: Enter email to send the link directly to the candidate
                    </p>
                  </div>
                </CardContent>
              </DashboardCard>

              <DashboardCard>
                <CardHeader>
                  <CardTitle>Select Interview Questions</CardTitle>
                  <CardDescription>
                    Choose questions for the AI interviewer to ask
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockQuestionCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{category.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {category.questions.length} questions
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {category.questions.map((question) => (
                            <div key={question.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={question.id}
                                checked={selectedQuestions.includes(question.id)}
                                onCheckedChange={() => handleQuestionToggle(question.id)}
                                className="mt-1"
                              />
                              <Label
                                htmlFor={question.id}
                                className="text-sm font-normal leading-tight cursor-pointer"
                              >
                                {question.text}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4 border-t pt-6">
                  <Button 
                    variant="outline"
                    onClick={resetForm}
                    className="sm:w-auto w-full"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Form
                  </Button>
                  <Button 
                    onClick={handleGenerateLink}
                    disabled={isGenerating}
                    className="sm:w-auto w-full"
                  >
                    {isGenerating ? (
                      <>
                        <div className="flex gap-1 items-center">
                          <span className="loading-dot"></span>
                          <span className="loading-dot"></span>
                          <span className="loading-dot"></span>
                        </div>
                        <span className="ml-2">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Link className="mr-2 h-4 w-4" />
                        Generate Interview Link
                      </>
                    )}
                  </Button>
                </CardFooter>
              </DashboardCard>
            </div>

            {generatedLink && (
              <div className="md:sticky md:top-6 self-start animate-scale-in">
                <DashboardCard className="bg-primary/5 backdrop-blur-md border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">Interview Link Generated</CardTitle>
                    <CardDescription>
                      Share this link with the candidate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-white rounded-md border flex items-center gap-2 overflow-hidden">
                      <div className="truncate text-sm font-mono">{generatedLink}</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="shrink-0"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="pt-2 space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={handleCopyLink}
                      >
                        <span className="flex items-center">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </span>
                        <Badge variant="secondary" className="ml-2">Recommended</Badge>
                      </Button>
                      
                      <Button 
                        className="w-full justify-start"
                        onClick={handleSendEmail}
                        disabled={!candidateEmail}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send via Email
                      </Button>
                      
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Interview Details</div>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs flex justify-between">
                            <span className="text-muted-foreground">Position:</span>
                            <span className="font-medium">{position}</span>
                          </p>
                          <p className="text-xs flex justify-between">
                            <span className="text-muted-foreground">Candidate:</span>
                            <span className="font-medium">{candidateName}</span>
                          </p>
                          <p className="text-xs flex justify-between">
                            <span className="text-muted-foreground">Questions:</span>
                            <span className="font-medium">{selectedQuestions.length}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </DashboardCard>
              </div>
            )}
          </div>
          
          {interviewLinks.length > 0 && (
            <DashboardCard>
              <CardHeader>
                <CardTitle>Generated Interview Links</CardTitle>
                <CardDescription>
                  Recently created interview links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewLinks.map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white/50 hover:bg-white/80 transition-colors">
                      <div className="space-y-1">
                        <div className="font-medium">{interview.candidate}</div>
                        <div className="text-sm text-muted-foreground">{interview.position} • {interview.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(interview.link);
                            toast({
                              title: "Link copied",
                              description: "Interview link copied to clipboard"
                            });
                          }}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewInterview(interview.link)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </DashboardCard>
          )}
        </TabsContent>

        <TabsContent value="manage">
          <DashboardCard>
            <CardHeader>
              <CardTitle>Interview Templates</CardTitle>
              <CardDescription>
                Create and manage reusable interview templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">Product Management Template</h3>
                  <p className="text-sm text-muted-foreground">12 questions · Last used 2 days ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">Software Engineering Template</h3>
                  <p className="text-sm text-muted-foreground">15 questions · Last used 1 week ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">UX Designer Template</h3>
                  <p className="text-sm text-muted-foreground">10 questions · Last used 2 weeks ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Template
              </Button>
            </CardContent>
          </DashboardCard>
        </TabsContent>
      </Tabs>

      <Link to="/candidate-recording">
        <Button variant="outline" className="ml-2">
          <Video className="h-4 w-4 mr-2" />
          Test Candidate Recording
        </Button>
      </Link>
    </div>
  );
};

export default InterviewManagement;
