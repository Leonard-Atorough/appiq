import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApplicationActions, useApplications } from "../../data/useApplications";
import { ApplicationInfoZone } from "../detail/ApplicationInfoZone";
import { ApplicationNotesTab } from "../detail/tabs/ApplicationNotesTab";
import { ApplicationTimelineTab } from "../detail/tabs/ApplicationTimelineTab";
import { ApplicationCvTab } from "../detail/tabs/ApplicationCvTab";
import { AddApplicationForm } from "../forms/AddApplicationForm";
import { Button, EmptyState, Icon, Tabs } from "@/shared/ui";

interface ApplicationDetailsPageProps {
  applicationId: string;
}

export function ApplicationDetailsPage({ applicationId }: ApplicationDetailsPageProps) {
  const navigate = useNavigate();
  const { applications } = useApplications();
  const {updateAsync: updateApplication } = useApplicationActions();
  const application = applications.find((a) => a.id === applicationId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!application) {
    return (
      <EmptyState
        title="Application not found"
        description="This application may have been deleted."
        action={{
          label: "Back to Applications",
          onClick: () => void navigate({ to: "/applications" }),
        }}
      />
    );
  }

  const tabs = [
    {
      id: "notes",
      label: "Notes",
      content: (
        <ApplicationNotesTab
          application={application}
          onSave={(notes) => updateApplication.execute(applicationId, { notes })}
        />
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      content: <ApplicationTimelineTab applicationId={applicationId} />,
    },
    {
      id: "cv",
      label: "CV",
      content: <ApplicationCvTab />,
    },
  ];

  return (
    <div className="flex flex-col gap-lg p-sm mx-auto">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => void navigate({ to: "/applications" })}
        className="self-start"
      >
        <span className="flex items-center gap-xs">
          <Icon name="chevron-left" size="sm" />
          Back
        </span>
      </Button>

      <ApplicationInfoZone application={application} onEdit={() => setIsEditOpen(true)} />

      <Tabs tabs={tabs}  defaultTab="notes" />

      <AddApplicationForm
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={application}
        onCreateApplication={async () => {}}
        onUpdateApplication={(updates) => updateApplication.execute(applicationId, updates)}
      />
    </div>
  );
}
