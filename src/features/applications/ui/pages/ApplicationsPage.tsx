import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ApplicationsTableView } from "../list/ApplicationsTableView";
import { ApplicationsKanbanView } from "../list/ApplicationsKanbanView";
import { AddApplicationForm } from "../forms/AddApplicationForm";
import { Button, Tabs } from "@/shared/ui";
import { useApplications } from "../../data/useApplications";
import { useApplicationActions } from "../../data/useApplicationActions";
import type { JobApplication } from "@/entities";

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<"table" | "kanban">("table");
  const [editApplicationId, setEditApplicationId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { applications } = useApplications();
  const {
    createAsync: createApplication,
    updateAsync: updateApplication,
    deleteAsync: deleteApplication,
  } = useApplicationActions({ withSuccess: true, withError: true });

  const openCreateModal = () => {
    setEditApplicationId(null);
    setModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setEditApplicationId(id);
    setModalOpen(true);
  };

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
      <div className="mb-md">
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
      <div className="mb-md flex items-center justify-between">
        <p className="text-md text-muted">Total Applications: {applications.length}</p>
        <Button variant="primary" size="md" onClick={openCreateModal}>
          Add Application
        </Button>
      </div>
      {selectedView === "table" ? (
        <ApplicationsTableView
          onCreateApplication={openCreateModal}
          onEditApplication={openEditModal}
          onDeleteApplication={(id) => {
            void deleteApplication.execute(id);
          }}
          onNavigateToApplication={handleNavigateToApplication}
        />
      ) : (
        <ApplicationsKanbanView
          onEditApplication={openEditModal}
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
