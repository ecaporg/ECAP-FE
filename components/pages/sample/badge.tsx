import { Sample, SampleFlagCategory, SampleStatus } from "@/types/student";
import { CompletionStatus } from "@/components/table/complation-status";
import { getUser } from "@/lib/get-user";
import { getUserName } from "@/utils";
import { defaultUser } from "@/types";

export async function SampleBagde({ sample }: { sample: Sample }) {
  const user = await getUser();

  if (sample.status === SampleStatus.COMPLETED) {
    const isMyMessage = sample.flag_completed?.user_id == user?.id;

    return (
      <div className="pb-6 flex items-center gap-4">
        <CompletionStatus variant="Complete" className="h-14 w-60">
          {sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE
            ? "Error Corrected"
            : sample.flag_completed?.message || "Completed"}
        </CompletionStatus>
        {sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE && (
          <p>
            {isMyMessage
              ? "Your "
              : `${getUserName(
                  sample.flag_errors?.user ||
                    sample.flag_missing_work?.user ||
                    defaultUser
                )}`}
            {sample.flag_completed?.message}
          </p>
        )}
      </div>
    );
  }

  const isMyComment =
    (sample.flag_errors?.user_id || sample.flag_missing_work?.user_id) ==
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
                sample.flag_errors?.user ||
                  sample.flag_missing_work?.user ||
                  defaultUser
              )}'s comment: `}
        </b>
        <p>{sample.flag_errors?.comment || sample.flag_missing_work?.reason}</p>
      </div>
    );
  }

  return null;
}
