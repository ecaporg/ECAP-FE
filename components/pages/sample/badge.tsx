import { Sample, SampleStatus } from "@/types/student";
import { CompletionStatus } from "@/components/table/complation-status";

export function SampleBagde({ sample }: { sample: Sample }) {
  if (sample.status === SampleStatus.COMPLETED && sample.flag_completed) {
    return (
      <div className="pb-6">
        <CompletionStatus variant="Complete" className="h-14 w-60">
          {sample.flag_completed.message}
        </CompletionStatus>
      </div>
    );
  }

  if (
    sample.status === SampleStatus.ERRORS_FOUND ||
    sample.status === SampleStatus.FLAGGED_TO_ADMIN
  ) {
    return (
      <div className="pb-6 flex items-center gap-4">
        <CompletionStatus variant="Overdue" className="h-14 w-60">
          Error flagged
        </CompletionStatus>
        <b>You comment: </b>
        <p>{sample.flag_errors?.comment || sample.flag_missing_work?.reason}</p>
      </div>
    );
  }

  return null;
}
