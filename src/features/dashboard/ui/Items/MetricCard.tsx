import { Card } from "@/shared/ui/Card/Card";

interface MetricCardProps {
  icon: React.ReactNode;
  description: string;
  value: string | number;
}

export function MetricCard({ icon, description, value }: MetricCardProps) {
  return (
    <Card className="flex items-center gap-4 p-4" draggable={false}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </Card>
  );
}
