import { CompletionStatus } from '@/components/table/completion-status';
import { defaultUser } from '@/constants/user';
import { getUser } from '@/lib/get-user';
import type { ISample } from '@/types';
import { getUserName } from '@/utils';
import { SampleFlagCategory, SampleStatus } from 'ecap-lib/dist/constants';

export async function SampleBagde({ sample }: { sample: ISample }) {
  const user = await getUser();

  if (sample.status === SampleStatus.COMPLETED) {
    const isMyMessage = sample.flag_completed?.user_id === user?.id;

    return (
      <div className="p-6 flex items-center gap-4">
        <CompletionStatus variant="Complete" className="h-14 w-60">
          {sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE
            ? 'Error Corrected'
            : sample.flag_completed?.message || 'Complete'}
        </CompletionStatus>
        {sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE && (
          <p>
            {isMyMessage ? 'Your ' : `${getUserName(sample.flag_completed?.user || defaultUser)} `}
            {sample.flag_completed?.message}
          </p>
        )}
      </div>
    );
  }

  const isMyComment =
    (sample.flag_errors?.user_id || sample.flag_missing_work?.user_id) === user?.id;

  if (sample.flag_category === SampleFlagCategory.ERROR_IN_SAMPLE) {
    return (
      <div className="py-6 flex items-center gap-4">
        <CompletionStatus variant="Overdue" className="h-14 w-60">
          Error flagged
        </CompletionStatus>
        <b>
          {isMyComment
            ? 'Your comment: '
            : `${getUserName(
                sample.flag_errors?.user || sample.flag_missing_work?.user || defaultUser
              )}'s comment: `}
        </b>
        <p>{sample.flag_errors?.comment || sample.flag_missing_work?.reason}</p>
      </div>
    );
  }

  return null;
}
