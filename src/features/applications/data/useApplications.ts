import { JobApplicationRepositoryImpl } from "@/shared/storage/repositories/jobApplication.repository";
import { useAsync } from "../../../shared/lib/hooks/useAsync";
import { db } from "@/shared/storage/indexeddb/dexieClient";

export function useApplications() {
    const {loading, status, error, data, execute} = useAsync(
        async () => {
            const repo = new JobApplicationRepositoryImpl(db);
            return await repo.listApplications();
        },
        { autoExecute: true },
    );

    return {applications: data ?? [], loading, error, status, refresh: execute};
}