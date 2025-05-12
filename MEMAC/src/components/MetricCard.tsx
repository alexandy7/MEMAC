import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: MetricCardProps) => {
  return (
    <div className="metric-card animate-in cursor-pointer border-2 border-gray-300" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-neutral">{title}</span>
        <Icon className="text-purple" size={20} />
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm text-neutral">{subtitle}</p>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;