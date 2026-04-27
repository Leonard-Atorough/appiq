import { useState } from "react";
import { ApplicationsTableView } from "./ApplicationsTableView";
import { ApplicationsKanbanView } from "./ApplicationsKanbanView";
import { AddApplicationForm } from "./AddApplicationForm";
import { Tabs } from "@/shared/ui";
import { useApplications } from "../data/useApplications";
import type { JobApplication } from "@/entities";

export default function ApplicationsPage() {
  const [selectedView, setSelectedView] = useState<"table" | "kanban">("table");
  const [editApplicationId, setEditApplicationId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { createApplication, updateApplication, deleteApplication, applications } =
    useApplications();

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) setEditApplicationId(null);
  };

  const handleUpdateApplication = async (data: Partial<Omit<JobApplication, "id">>) => {
    if (!editApplicationId) return;
    await updateApplication(editApplicationId, data);
  };

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
      {selectedView === "table" ? (
        <ApplicationsTableView
          onAddApplication={() => setModalOpen(true)}
          onEditApplication={(id) => {
            setEditApplicationId(id);
            setModalOpen(true);
          }}
          onDeleteApplication={deleteApplication}
        />
      ) : (
        <ApplicationsKanbanView
          onAddApplication={() => setModalOpen(true)}
          onEditApplication={(id) => {
            setEditApplicationId(id);
            setModalOpen(true);
          }}
        />
      )}
      <AddApplicationForm
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        onCreateApplication={createApplication}
        onUpdateApplication={handleUpdateApplication}
        data={
          editApplicationId
            ? (applications.find((app) => app.id === editApplicationId) ?? null)
            : null
        }
      />
    </div>
  );
}
