import { Card } from "@/shared/ui/Card/Card";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <Card size="md" interactive={false} className="flex-1 min-w-0">
      <div className="flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted font-medium">{label}</p>
          <span className="text-muted">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </div>
    </Card>
  );
}
