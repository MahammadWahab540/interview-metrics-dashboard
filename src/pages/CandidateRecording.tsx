
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Camera, MicrophoneIcon, Video } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

const CandidateRecording = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [cameraAccessGranted, setCameraAccessGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  // Initialize camera on component mount
  useEffect(() => {
    requestCameraAccess();
    
    // Clean up on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const requestCameraAccess = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      setCameraAccessGranted(true);
      setErrorMessage(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      toast({
        title: "Camera access granted",
        description: "You're ready to begin your interview recording."
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setCameraAccessGranted(false);
      setErrorMessage("Unable to access your camera or microphone. Please ensure you have granted permission and that your devices are working properly.");
      
      toast({
        title: "Camera access denied",
        description: "Please enable camera and microphone access to continue with the interview.",
        variant: "destructive"
      });
    }
  };
  
  const startRecording = () => {
    if (!stream) return;
    
    try {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });
        setRecordedBlob(recordedBlob);
        
        toast({
          title: "Recording complete",
          description: "Your interview has been recorded. You can now review and submit it."
        });
      };
      
      // Start recording
      mediaRecorder.start();
      setRecording(true);
      setRecordedBlob(null);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly and look into the camera."
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording failed",
        description: "There was an error starting the recording. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const submitInterview = () => {
    if (!recordedBlob) {
      toast({
        title: "No recording available",
        description: "Please record your interview before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally upload the blob to a server
    // For this example, we'll just simulate a successful upload
    toast({
      title: "Interview submitted successfully",
      description: "Your interview recording has been submitted for review."
    });
    
    // Reset the recording state
    setRecordedBlob(null);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const retryCamera = () => {
    requestCameraAccess();
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">AI Interview Recording</h1>
        <p className="text-slate-500 mt-1">Record your interview response for review</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        {/* Camera feed / recording area */}
        <div className="md:w-2/3">
          <DashboardCard className="h-full flex flex-col overflow-hidden">
            {/* Video container */}
            <div className="relative flex-grow bg-black rounded-t-lg overflow-hidden">
              {cameraAccessGranted ? (
                <>
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {recording && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span>{formatTime(recordingTime)}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-500">
                  <AlertCircle className="h-12 w-12 mb-4 text-slate-400" />
                  <p className="text-center max-w-md px-4">{errorMessage || "Camera access is required for the interview."}</p>
                  <Button onClick={retryCamera} className="mt-4">
                    Grant Camera Access
                  </Button>
                </div>
              )}
            </div>
            
            {/* Controls */}
            <CardFooter className="flex justify-between p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Camera className="h-4 w-4" />
                  <span>{cameraAccessGranted ? "Camera ready" : "No camera"}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <MicrophoneIcon className="h-4 w-4" />
                  <span>{cameraAccessGranted ? "Microphone ready" : "No microphone"}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!recording && !recordedBlob && (
                  <Button 
                    onClick={startRecording} 
                    disabled={!cameraAccessGranted}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Start Recording
                  </Button>
                )}
                
                {recording && (
                  <Button 
                    onClick={stopRecording} 
                    variant="destructive"
                  >
                    Stop Recording
                  </Button>
                )}
                
                {recordedBlob && (
                  <Button 
                    onClick={submitInterview}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Submit Interview
                  </Button>
                )}
              </div>
            </CardFooter>
          </DashboardCard>
        </div>
        
        {/* Instructions panel */}
        <div className="md:w-1/3">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <h2 className="text-lg font-medium">Interview Guidelines</h2>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="border-l-4 border-primary/30 pl-3 py-1">
                  <h3 className="font-medium text-sm">Before you begin:</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                      <span>Ensure you are in a quiet environment with good lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                      <span>Position yourself centered in the frame</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                      <span>Speak clearly and at a moderate pace</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-3 py-1">
                  <h3 className="font-medium text-sm">During the recording:</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                      <span>Maintain eye contact with the camera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                      <span>Respond thoroughly using the STAR method (Situation, Task, Action, Result)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                      <span>Focus on providing specific examples rather than general statements</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-3 py-1">
                  <h3 className="font-medium text-sm">After recording:</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                      <span>Review your recording if possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                      <span>Click "Submit Interview" when you are satisfied with your response</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateRecording;
