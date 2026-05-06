import { Card, Flex } from "@/shared/ui";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <Card
      size="md"
      interactive={false}
      className="w-full md:flex-1 md:min-w-0"
    >
      <Flex direction="column" gap="sm" role="region" aria-label={label} className="h-full">
        <span className="text-muted" aria-hidden="true">
          {icon}
        </span>
        <p className=" text-2xl lg:text-3xl font-bold text-primary">{value}</p>
        <p className="text-sm lg:text-lg text-muted font-medium">{label}</p>
      </Flex>
    </Card>
  );
}
