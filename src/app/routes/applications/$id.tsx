import { ApplicationDetailsPage } from "@/features/applications";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/applications/$id")({
    component: ApplicationDetailsPage,
});