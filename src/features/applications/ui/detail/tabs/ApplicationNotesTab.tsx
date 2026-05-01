import { useState } from "react";
import { Button, EmptyState, Icon, Textarea } from "@/shared/ui";
import type { JobApplication } from "@/entities";

interface ApplicationNotesTabProps {
  application: JobApplication;
  onSave: (notes: string) => Promise<void>;
}

export function ApplicationNotesTab({ application, onSave }: ApplicationNotesTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(application.notes ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(draft);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(application.notes ?? "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-md p-md">
        <Textarea
          label="Notes"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoGrow
          size="md"
          minRows={4}
          placeholder="Add your notes here..."
        />
        <div className="flex gap-sm">
          <Button variant="primary" size="md" onClick={handleSave} loading={saving}>
            Save
          </Button>
          <Button variant="ghost" size="md" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (!application.notes) {
    return (
      <div className="p-md">
        <EmptyState
          title="No notes yet"
          description="Add notes about this application, interview tips, or anything useful."
          size="sm"
          action={{ label: "Add Notes", onClick: () => setIsEditing(true) }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md p-md">
      <div className="bg-muted rounded-lg p-md">
        <p className="text-md text-primary leading-relaxed whitespace-pre-wrap">
          {application.notes}
        </p>
      </div>
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsEditing(true)}
        className="self-start"
      >
        <span className="flex items-center gap-xs">
          <Icon name="edit" size="md" />
          Edit Notes
        </span>
      </Button>
    </div>
  );
}
