import { Sample, SampleStatus } from "@/types/student";
import { CompletionStatus } from "@/components/table/complation-status";
import { getUser } from "@/lib/get-user";
import { getUserName } from "@/utils";

export async function SampleBagde({ sample }: { sample: Sample }) {
  if (sample.status === SampleStatus.COMPLETED && sample.flag_completed) {
    return (
      <div className="pb-6">
        <CompletionStatus variant="Complete" className="h-14 w-60">
          {sample.flag_completed.message}
        </CompletionStatus>
      </div>
    );
  }

  const user = await getUser();

  const isMyComment =
    (sample.flag_errors?.user_id || sample.flag_missing_work?.user_id) ===
    user?.id;

  if (
    sample.status === SampleStatus.ERRORS_FOUND ||
    sample.status === SampleStatus.FLAGGED_TO_ADMIN
  ) {
    return (
      <div className="pb-6 flex items-center gap-4">
        <CompletionStatus variant="Overdue" className="h-14 w-60">
          Error flagged
        </CompletionStatus>
        <b>
          {isMyComment
            ? "Your comment: "
            : `${getUserName(
                sample.flag_errors?.user || sample.flag_missing_work?.user
              )}'s comment: `}
        </b>
        <p>{sample.flag_errors?.comment || sample.flag_missing_work?.reason}</p>
      </div>
    );
  }

  return null;
}
