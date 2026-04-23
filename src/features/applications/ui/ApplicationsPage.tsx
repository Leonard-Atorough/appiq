import { useState } from "react";
import { ApplicationsTableView } from "./ApplicationsTableView";
import { ApplicationsKanbanView } from "./ApplicationsKanbanView";

export default function ApplicationsPage() {
  const [selectedView, setSelectedView] = useState<"table" | "kanban">("table");

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setSelectedView("table")} className="mr-2">
          Table View
        </button>
        <button onClick={() => setSelectedView("kanban")}>Kanban View</button>
      </div>
      {selectedView === "table" ? <ApplicationsTableView /> : <ApplicationsKanbanView />}
    </div>
  );
}
