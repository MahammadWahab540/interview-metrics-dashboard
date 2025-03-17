
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Status = "pending" | "completed" | "reviewed";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
  },
  completed: {
    label: "Completed",
    className: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "font-normal text-xs px-2 py-0.5 rounded-full", 
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
