import { useMemo, useCallback } from "react";
import { useToast } from "@/shared/lib";
import { useAsync } from "@/shared/lib";
import { jobApplicationRepository, applicationEventRepository, db } from "@/shared/storage";
import type { JobApplicationRepository } from "@/shared/storage";
import type { ApplicationEventRepository } from "@/shared/storage";
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
export function useApplicationActions(
  options: UseApplicationActionsOptions = {},
  repo: JobApplicationRepository = jobApplicationRepository,
  eventRepo: ApplicationEventRepository = applicationEventRepository,
) {
  const { withSuccess = false, withError = false } = options;

  // Memoize repositories to prevent unnecessary callback recreations
  const memoizedRepo = useMemo(() => repo, [repo]);
  const memoizedEventRepo = useMemo(() => eventRepo, [eventRepo]);

  // Always call the hook (rules of hooks - must be unconditional)
  // If feedback is disabled, this still gets called but the context won't be used
  const { addToast } = useToast();

  // Delete operation
  const deleteAsync = useAsync(
    useCallback(
      async (id: string) => {
        await db.transaction("rw", db.applications, db.applicationEvents, async () => {
          await memoizedRepo.deleteApplication(id);
          await memoizedEventRepo.deleteByApplicationId(id);
        });
      },
      [memoizedRepo, memoizedEventRepo],
    ),
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
    useCallback(
      async (application: Omit<JobApplication, "id">) => {
        await memoizedRepo.createApplication(application);
      },
      [memoizedRepo],
    ),
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
    useCallback(
      async (id: string, updates: Partial<Omit<JobApplication, "id">>) => {
        await memoizedRepo.updateApplication(id, updates);
      },
      [memoizedRepo],
    ),
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
    useCallback(
      async (id: string, newStatus: ApplicationStatus) => {
        const current = await memoizedRepo.getApplicationById(id);
        const fromStatus = current?.status;
        await memoizedRepo.updateApplication(id, { status: newStatus });
        await memoizedEventRepo.createEvent({
        applicationId: id,
        type: "status_change",
        title: `Status changed to ${newStatus}`,
        date: new Date().toISOString(),
        fromStatus,
        toStatus: newStatus,
        });
      },
      [memoizedRepo, memoizedEventRepo],
    ),
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
