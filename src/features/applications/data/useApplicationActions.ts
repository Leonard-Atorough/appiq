import { useToast } from "@/shared/lib";
import { useAsync } from "@/shared/lib";
import { JobApplicationRepositoryImpl } from "@/shared/storage";
import { ApplicationEventRepositoryImpl } from "@/shared/storage";
import { db } from "@/shared/storage";
import type { ApplicationStatus, JobApplication } from "@/entities";

interface UseApplicationActionsOptions {
  withSuccess?: boolean;
  withError?: boolean;
}

/**
 * Handle errors safely:
 * - Log raw error to console in dev mode
 * - Return friendly, non-exposing message for UI
 */
function getFriendlyErrorMessage(err: unknown, action: string): string {
  if (import.meta.env.DEV) {
    console.error(`[${action}]`, err);
  }

  // Return friendly message that doesn't expose internal details
  return `Failed to ${action.toLowerCase()}. Please try again.`;
}

/**
 * useApplicationActions
 *
 * Creates async operations for application CRUD with optional built-in toast feedback.
 * Pass { withSuccess: true, withError: true } to enable automatic toast notifications.
 *
 * Usage without feedback:
 * ```tsx
 * const { deleteAsync } = useApplicationActions();
 * await deleteAsync.execute(id);  // No feedback
 * ```
 *
 * Usage with feedback:
 * ```tsx
 * const { createAsync } = useApplicationActions({ withSuccess: true, withError: true });
 * await createAsync.execute(data);  // Toast shown automatically
 * ```
 */
export function useApplicationActions(options: UseApplicationActionsOptions = {}) {
  const { withSuccess = false, withError = false } = options;

  // Always call the hook (rules of hooks - must be unconditional)
  // If feedback is disabled, this still gets called but the context won't be used
  const { addToast } = useToast();

  // Delete operation
  const deleteAsync = useAsync(
    async (id: string) => {
      const repo = new JobApplicationRepositoryImpl(db);
      await repo.deleteApplication(id);
    },
    {
      autoExecute: false,
      onSuccess: withSuccess
        ? () => {
            addToast({
              title: "Application deleted",
              description: "The application has been removed from your list.",
              variant: "success",
            });
          }
        : undefined,
      onError: withError
        ? (err) => {
            addToast({
              title: "Error deleting application",
              description: getFriendlyErrorMessage(err, "delete application"),
              variant: "error",
            });
          }
        : undefined,
    },
  );

  // Create operation
  const createAsync = useAsync(
    async (application: Omit<JobApplication, "id">) => {
      const repo = new JobApplicationRepositoryImpl(db);
      await repo.createApplication(application);
    },
    {
      autoExecute: false,
      onSuccess: withSuccess
        ? () => {
            addToast({
              title: "Application created",
              description: "Your new application has been saved.",
              variant: "success",
            });
          }
        : undefined,
      onError: withError
        ? (err) => {
            addToast({
              title: "Error creating application",
              description: getFriendlyErrorMessage(err, "create application"),
              variant: "error",
            });
          }
        : undefined,
    },
  );

  // Update operation
  const updateAsync = useAsync(
    async (id: string, updates: Partial<Omit<JobApplication, "id">>) => {
      const repo = new JobApplicationRepositoryImpl(db);
      await repo.updateApplication(id, updates);
    },
    {
      autoExecute: false,
      onSuccess: withSuccess
        ? () => {
            addToast({
              title: "Application updated",
              description: "Your changes have been saved.",
              variant: "success",
            });
          }
        : undefined,
      onError: withError
        ? (err) => {
            addToast({
              title: "Error updating application",
              description: getFriendlyErrorMessage(err, "update application"),
              variant: "error",
            });
          }
        : undefined,
    },
  );

  // Move operation
  const moveAsync = useAsync(
    async (id: string, newStatus: ApplicationStatus) => {
      const repo = new JobApplicationRepositoryImpl(db);
      const eventRepo = new ApplicationEventRepositoryImpl(db);
      await repo.updateApplication(id, { status: newStatus });
      await eventRepo.createEvent({
        applicationId: id,
        type: "status_change",
        title: `Status changed to ${newStatus}`,
        date: new Date().toISOString(),
      });
    },
    {
      autoExecute: false,
      onSuccess: withSuccess
        ? () => {
            addToast({
              title: "Application moved",
              description: "The application status has been updated.",
              variant: "success",
            });
          }
        : undefined,
      onError: withError
        ? (err) => {
            addToast({
              title: "Error moving application",
              description: getFriendlyErrorMessage(err, "move application"),
              variant: "error",
            });
          }
        : undefined,
    },
  );

  return {
    createAsync,
    updateAsync,
    deleteAsync,
    moveAsync,
  };
}
