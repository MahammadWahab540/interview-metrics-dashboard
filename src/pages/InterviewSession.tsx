
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Camera, CameraOff, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

const InterviewSession = () => {
  const { toast } = useToast();
  const { interviewId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Mock data - would come from API in real implementation
  const interviewData = {
    position: "Product Manager",
    company: "Acme Inc.",
    totalQuestions: 5,
    currentQuestions: [
      "Tell me about yourself and your background.",
      "Describe a challenging project you managed and how you handled it.",
      "How do you prioritize features when you have limited resources?",
      "Give an example of how you've used data to drive a product decision.",
      "Where do you see yourself in 5 years?"
    ],
    aiResponse: "Thank you for that answer. Your experience with cross-functional teams is impressive. Now, let's move on to the next question..."
  };
  
  useEffect(() => {
    // Request camera and microphone permissions on component mount
    const setupMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        
        setStream(mediaStream);
        
        toast({
          title: "Camera and microphone access granted",
          description: "You're all set for the interview!"
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
        toast({
          title: "Could not access camera or microphone",
          description: "Please ensure you've granted the necessary permissions.",
          variant: "destructive"
        });
      }
    };
    
    setupMedia();
    
    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);
  
  const toggleMicrophone = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
      
      toast({
        title: isMicOn ? "Microphone turned off" : "Microphone turned on",
        description: isMicOn ? "The AI interviewer cannot hear you" : "The AI interviewer can hear you now"
      });
    }
  };
  
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
      
      toast({
        title: isCameraOn ? "Camera turned off" : "Camera turned on",
        description: isCameraOn ? "Your video is now hidden" : "Your video is now visible"
      });
    }
  };
  
  const startInterview = () => {
    setInterviewStarted(true);
    setIsRecording(true);
    
    toast({
      title: "Interview started",
      description: "The AI interviewer will begin asking questions now."
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < interviewData.totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of interview
      toast({
        title: "Interview completed",
        description: "Thank you for completing the interview. Results will be shared with the hiring team."
      });
      
      setIsRecording(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/5">
            Interview ID: {interviewId || "12345"}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/5">
            {interviewData.position} • {interviewData.company}
          </Badge>
        </div>
        
        {isRecording && (
          <Badge className="bg-red-500 text-white animate-pulse">
            Recording
          </Badge>
        )}
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        <div className="md:col-span-2">
          {/* Video section */}
          <Card className="h-full flex flex-col overflow-hidden">
            <div className="relative flex-grow bg-black rounded-t-lg overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted={!isMicOn} 
                className={`w-full h-full object-cover ${!isCameraOn ? 'invisible' : ''}`}
              />
              
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                      {interviewData.position.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {!interviewStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                  <h2 className="text-white text-2xl mb-6 font-medium">Ready to start your interview?</h2>
                  <Button size="lg" onClick={startInterview}>
                    Begin Interview
                  </Button>
                </div>
              )}
            </div>
            
            <CardFooter className="flex justify-between p-4 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`rounded-full ${!isMicOn ? 'bg-red-50 text-red-500 border-red-200' : ''}`}
                  onClick={toggleMicrophone}
                >
                  {isMicOn ? <Mic /> : <MicOff />}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`rounded-full ${!isCameraOn ? 'bg-red-50 text-red-500 border-red-200' : ''}`}
                  onClick={toggleCamera}
                >
                  {isCameraOn ? <Camera /> : <CameraOff />}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Help information",
                      description: "Speak clearly and face the camera. Answer each question thoroughly."
                    });
                  }}
                >
                  <Info className="h-4 w-4 mr-1" />
                  Help
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* AI Interviewer section */}
          <Card className="flex-grow">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="AI Interviewer" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">AI Interviewer</h3>
                  <p className="text-sm text-muted-foreground">Powered by Lovable</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {interviewStarted ? (
                <>
                  <div className="border-l-4 border-primary/30 pl-4 py-1">
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Current Question:</h4>
                    <p className="text-lg">{interviewData.currentQuestions[currentQuestionIndex]}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {interviewData.totalQuestions}
                    </div>
                    <Progress value={((currentQuestionIndex + 1) / interviewData.totalQuestions) * 100} className="w-1/2" />
                  </div>
                  
                  {interviewData.aiResponse && (
                    <div className="bg-muted/50 p-3 rounded-lg mt-4">
                      <p className="text-sm">{interviewData.aiResponse}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-8">
                  <p className="text-center text-muted-foreground">
                    The AI interviewer will begin once you start the interview.
                  </p>
                </div>
              )}
            </CardContent>
            
            {interviewStarted && (
              <CardFooter className="border-t pt-4">
                <Button 
                  className="w-full" 
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex >= interviewData.totalQuestions - 1 && !isRecording}
                >
                  {currentQuestionIndex < interviewData.totalQuestions - 1 
                    ? "Next Question" 
                    : isRecording 
                      ? "Complete Interview" 
                      : "Interview Completed"}
                </Button>
              </CardFooter>
            )}
          </Card>
          
          {/* Instructions and tips */}
          <Card>
            <CardHeader className="pb-2 pt-4">
              <h3 className="text-sm font-medium">Tips for Success</h3>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                  <span>Speak clearly and directly into your microphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                  <span>Position yourself in frame with good lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                  <span>Answer thoroughly using the STAR method when relevant</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
