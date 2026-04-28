import { EmptyState } from "@/shared/ui";

export function ApplicationCvTab() {
  return (
    <div className="p-md">
      <EmptyState
        title="CV tracking coming soon"
        description="You'll be able to attach the CV version you used for this application."
        size="sm"
      />
    </div>
  );
}
