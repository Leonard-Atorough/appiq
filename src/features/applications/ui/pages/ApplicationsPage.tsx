import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ApplicationsTableView } from "../list/ApplicationsTableView";
import { ApplicationsKanbanView } from "../list/ApplicationsKanbanView";
import { AddApplicationForm } from "../forms/AddApplicationForm";
import { Tabs } from "@/shared/ui";
import { useApplicationActions, useApplications } from "../../data/useApplications";
import { useToast } from "@/shared/lib";
import type { JobApplication } from "@/entities";

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<"table" | "kanban">("table");
  const [editApplicationId, setEditApplicationId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { applications } = useApplications();
  const { addToast } = useToast();
  const {
    createAsync: createApplication,
    updateAsync: updateApplication,
    deleteAsync: deleteApplication,
  } = useApplicationActions();

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) setEditApplicationId(null);
  };

  const handleUpdateApplication = async (data: Partial<Omit<JobApplication, "id">>) => {
    if (!editApplicationId) return;
    await updateApplication.execute(editApplicationId, data);
  };

  const handleNavigateToApplication = (id: string) => {
    void navigate({ to: "/applications/$id", params: { id } });
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
          onDeleteApplication={(id) => {
            void deleteApplication.execute(id).catch((err) => {
              addToast({
                title: "Error deleting application",
                description: err instanceof Error ? err.message : "Unknown error",
                variant: "error",
              });
            });
          }}
          onNavigateToApplication={handleNavigateToApplication}
        />
      ) : (
        <ApplicationsKanbanView
          onAddApplication={() => setModalOpen(true)}
          onEditApplication={(id) => {
            setEditApplicationId(id);
            setModalOpen(true);
          }}
          onNavigateToApplication={handleNavigateToApplication}
        />
      )}
      <AddApplicationForm
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        onCreateApplication={(data) => createApplication.execute(data)}
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
