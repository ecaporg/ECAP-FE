import { Sample } from '@/types';
import { getUserName, getFormattedLP } from '@/utils';

export function SampleInfoForModal({ sample }: { sample: Sample }) {
  const metadata = [
    [
      {
        label: 'Student Name: ',
        value: getUserName(sample.assignment_period.student.user),
      },
      {
        label: 'Student ID',
        value: sample.assignment_period.student.id,
      },
      {
        label: 'Grade',
        value: sample.assignment_period.student.grade,
      },
    ],
    [
      {
        label: 'Subject:',
        value: sample.subject.name,
      },
      { label: 'Assignment:', value: 'empty' },
      {
        label: 'LP:',
        value: getFormattedLP(sample.assignment_period.learning_period),
      },
    ],
  ];
  return (
    <>
      {metadata.map((row, idx) => (
        <div key={`metadata-row-${idx}`} className="space-y-1 text-neutral-black text-base flex-1">
          {row.map((item) => (
            <div key={item.label} className="grid grid-cols-2 gap-4">
              <label className="text-primary text-start" htmlFor={item.label}>
                {item.label}
              </label>
              <input
                className="text-end outline-none truncate"
                type="text"
                id={item.label}
                value={item.value}
                readOnly
                title={item.value.toString()}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export const ReasonForMissingSample = ({
  sample,
  isDirector,
}: {
  sample: Sample;
  isDirector: boolean;
}) => {
  return isDirector ? (
    <>
      <b className="text-primary">Reason for Missing Sample:</b> {sample.flag_missing_work?.reason}
    </>
  ) : (
    <>
      <b>Reason given:</b> "{sample.flag_missing_work?.reason}"
    </>
  );
};
