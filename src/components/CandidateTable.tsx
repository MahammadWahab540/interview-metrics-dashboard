
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  name: string;
  position: string;
  date: string;
  status: "pending" | "completed" | "reviewed";
  score?: number;
}

interface CandidateTableProps {
  candidates: Candidate[];
  showScore?: boolean;
  className?: string;
  onView?: (id: string) => void;
}

const CandidateTable = ({ 
  candidates, 
  showScore = false, 
  className,
  onView 
}: CandidateTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className={cn("table-container", className)}>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="w-[250px]">Candidate</th>
            <th>Position</th>
            <th>Date</th>
            <th>Status</th>
            {showScore && <th className="text-center">Score</th>}
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr 
              key={candidate.id}
              onMouseEnter={() => setHoveredRow(candidate.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className="animate-fade-in"
              style={{ animationDelay: `${parseInt(candidate.id) * 50}ms` }}
            >
              <td className="font-medium">{candidate.name}</td>
              <td>{candidate.position}</td>
              <td>{candidate.date}</td>
              <td>
                <StatusBadge status={candidate.status} />
              </td>
              {showScore && (
                <td className="text-center">
                  {candidate.score ? (
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {candidate.score}/100
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              )}
              <td className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView?.(candidate.id)}
                  className={cn(
                    "px-2 transition-opacity",
                    hoveredRow === candidate.id ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
