import { useState } from "react";
import { Button, EmptyState, Icon, Input, Select, Skeleton } from "@/shared/ui";
import { useApplicationEvents } from "../../../data/useApplicationEvents";
import { formatDate } from "../../../lib/applicationFormatters";
import type { ApplicationEventType } from "@/entities";

const EVENT_TYPE_LABELS: Record<ApplicationEventType, string> = {
  status_change: "Status Change",
  interview: "Interview",
  note: "Note",
  custom: "Custom",
};

const EVENT_TYPE_ICON: Record<ApplicationEventType, string> = {
  status_change: "chevron-right",
  interview: "briefcase",
  note: "info",
  custom: "check",
};

interface ApplicationTimelineTabProps {
  applicationId: string;
}

interface AddEventForm {
  title: string;
  type: Exclude<ApplicationEventType, "status_change">;
  date: string;
  description: string;
}

const EMPTY_FORM: AddEventForm = {
  title: "",
  type: "custom",
  date: new Date().toISOString().slice(0, 10),
  description: "",
};

export function ApplicationTimelineTab({ applicationId }: ApplicationTimelineTabProps) {
  const { events, loading, addEvent, deleteEvent } = useApplicationEvents(applicationId);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<AddEventForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof AddEventForm>(key: K, value: AddEventForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await addEvent({
        applicationId,
        type: form.type,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        date: new Date(form.date).toISOString(),
      });
      setForm(EMPTY_FORM);
      setIsAdding(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-sm p-md">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-md p-md">
      {events.length === 0 && !isAdding ? (
        <EmptyState
          title="No timeline events"
          description="Status changes are logged automatically. You can also add interviews and notes."
          size="sm"
          action={{ label: "Add Event", onClick: () => setIsAdding(true) }}
        />
      ) : (
        <>
          <ol className="flex flex-col gap-sm">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-start gap-sm bg-surface border border-base rounded-lg p-sm"
              >
                <span className="mt-xs shrink-0">
                  <Icon
                    name={EVENT_TYPE_ICON[event.type]}
                    size="sm"
                    variant={event.type === "status_change" ? "primary" : "muted"}
                  />
                </span>
                <div className="flex flex-col gap-xs min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-sm">
                    <p className="text-sm font-medium text-primary">{event.title}</p>
                    <span className="text-xs text-muted shrink-0">{formatDate(event.date)}</span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-secondary">{event.description}</p>
                  )}
                </div>
                {event.type !== "status_change" && (
                  <button
                    onClick={() => void deleteEvent(event.id)}
                    aria-label="Delete event"
                    className="shrink-0 text-muted hover:text-error transition-colors duration-150"
                  >
                    <Icon name="x" size="sm" />
                  </button>
                )}
              </li>
            ))}
          </ol>
          {!isAdding && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(true)}
              className="self-start"
            >
              <span className="flex items-center gap-xs">
                <Icon name="plus" size="sm" />
                Add Event
              </span>
            </Button>
          )}
        </>
      )}

      {isAdding && (
        <div className="border border-base rounded-lg p-md flex flex-col gap-md bg-muted">
          <h3 className="text-sm font-semibold text-primary">New Event</h3>
          <div className="grid grid-cols-2 gap-md">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Phone screen with HR"
            />
            <Select
              label="Type"
              value={form.type}
              onChange={(e) =>
                set("type", e.target.value as Exclude<ApplicationEventType, "status_change">)
              }
            >
              <option value="interview">{EVENT_TYPE_LABELS.interview}</option>
              <option value="note">{EVENT_TYPE_LABELS.note}</option>
              <option value="custom">{EVENT_TYPE_LABELS.custom}</option>
            </Select>
          </div>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
          <Input
            label="Description (optional)"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Additional context..."
          />
          <div className="flex gap-sm">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAdd}
              loading={submitting}
              disabled={!form.title.trim()}
            >
              Save Event
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAdding(false);
                setForm(EMPTY_FORM);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
