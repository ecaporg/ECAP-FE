import type { Sample } from '@/types';
import { getFormattedLP, getUserName } from '@/utils';

type MetadataType =
  | 'flag_missing'
  | 'view_missing'
  | 'flag_rejected'
  | 'view_rejected'
  | 'flag_errors';
type SampleInfoForModalProps = {
  sample: Sample;
  type: MetadataType;
};

const getMetadata = ({ sample, type }: SampleInfoForModalProps) => {
  const studentName = {
    label: 'Student Name: ',
    value: getUserName(sample.student_lp_enrollments[0].student.user),
  };

  const studentId = {
    label: 'Student ID',
    value: sample.student_lp_enrollments[0].student.id,
  };

  const studentGrade = {
    label: 'Grade',
    value: sample.student_lp_enrollments[0].student_grade,
  };

  const subject = {
    label: 'Subject:',
    value: sample.subject.name,
  };

  const assignment = {
    label: 'Assignment:',
    value: sample.assignment_title,
  };

  const lp = {
    label: 'LP:',
    value: getFormattedLP(sample.student_lp_enrollments[0].learning_period),
  };

  const teacher = {
    label: 'Teacher:',
    value:
      sample.flag_missing_work?.user?.name ||
      sample.flag_rejected?.user?.name ||
      sample.flag_errors?.user?.name,
  };

  if (type === 'flag_missing') {
    return [
      [studentName, studentId, studentGrade],
      [subject, lp],
    ];
  }

  if (type === 'view_missing' || type === 'flag_rejected' || type === 'view_rejected') {
    return [
      [teacher, studentName, studentId],
      [studentGrade, subject, lp],
    ];
  }

  if (type === 'flag_errors') {
    return [
      [studentName, studentId, studentGrade],
      [subject, assignment, lp],
    ];
  }

  return [];
};

export function SampleInfoForModal(props: SampleInfoForModalProps) {
  const metadata = getMetadata(props);
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
