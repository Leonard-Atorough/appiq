import { useState } from "react";
import { ApplicationsTableView } from "./ApplicationsTableView";
import { ApplicationsKanbanView } from "./ApplicationsKanbanView";
import { Tabs } from "@/shared/ui";

export default function ApplicationsPage() {
  const [selectedView, setSelectedView] = useState<"table" | "kanban">("table");

  return (
    <div>
      <div className="mb-4">
        <Tabs
          tabs={[
            { label: "Table View", id: "table" },
            { label: "Kanban View", id: "kanban" },
          ]}
          activeTab={selectedView}
          onChange={(value) => setSelectedView(value as "table" | "kanban")}
          variant="pill"
        />
      </div>
      {selectedView === "table" ? <ApplicationsTableView /> : <ApplicationsKanbanView />}
    </div>
  );
}
