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
        <span className="text-muted mb-md">{icon}</span>
        <p className="text-3xl font-bold text-primary">{value}</p>
        <p className="text-lg text-muted font-medium">{label}</p>
      </div>
    </Card>
  );
}
