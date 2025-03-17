
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InterviewManagement from "./pages/InterviewManagement";
import CandidateAnalysis from "./pages/CandidateAnalysis";
import InterviewSession from "./pages/InterviewSession";
import CandidateRecording from "./pages/CandidateRecording";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <Navbar />
            <main className="flex-1 px-0 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/interview-management" element={<InterviewManagement />} />
                <Route path="/candidate-analysis" element={<CandidateAnalysis />} />
                <Route path="/interview-session/:interviewId" element={<InterviewSession />} />
                <Route path="/candidate-recording" element={<CandidateRecording />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
