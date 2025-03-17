
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden border rounded-xl shadow-sm hover-lift",
      "bg-white/80 backdrop-blur-sm transition-all duration-300",
      className
    )}>
      {children}
    </Card>
  );
};

export default DashboardCard;
