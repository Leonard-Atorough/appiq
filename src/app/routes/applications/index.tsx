import { createFileRoute } from "@tanstack/react-router";
import { ApplicationsPage } from "@/features/applications";

export const Route = createFileRoute("/applications/")({
  component: ApplicationsPage,
});
