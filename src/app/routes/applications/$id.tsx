import { createFileRoute } from "@tanstack/react-router";
import { ApplicationDetailsPage } from "@features/applications";

export const Route = createFileRoute("/applications/$id")({
  component: function ApplicationDetailRoute() {
    const { id } = Route.useParams();
    return <ApplicationDetailsPage applicationId={id} />;
  },
});
