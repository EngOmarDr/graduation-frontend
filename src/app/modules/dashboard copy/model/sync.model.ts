export interface SyncResponse {
  nextSyncSchedule: string;
  syncJobs: SyncJobsResponse[];
}

export interface SyncJobsResponse {
  id: number;
  topic: string;
  batchSize: number;
  status: string;
  failureMessage?: string | null;
  executedAt: string;
}
