
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

const DashboardCard = ({ 
  children, 
  className,
  hoverable = true 
}: DashboardCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden border rounded-xl shadow-sm",
      "bg-white/80 backdrop-blur-sm transition-all duration-300",
      hoverable && "hover-lift",
      className
    )}>
      {children}
    </Card>
  );
};

export default DashboardCard;
