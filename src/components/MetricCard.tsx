
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, description, icon, className, trend }: MetricCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden hover-lift border",
      "bg-white/80 backdrop-blur-sm",
      className
    )}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <div className="text-2xl font-semibold animate-fade-in-up">
            {value}
          </div>
          {trend && (
            <div className={cn(
              "ml-2 text-xs",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
