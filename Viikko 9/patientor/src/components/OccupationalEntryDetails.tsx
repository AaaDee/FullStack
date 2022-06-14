import { OccupationalHealthcareEntry } from "../types";

interface LocalProps {
  entry: OccupationalHealthcareEntry;
}

export const OccupationalEntryDetails = ({entry}: LocalProps) => {
  return <div>
    <p>employer: {entry.employerName}</p>
    {entry.sickLeave && 
      <p>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
    }
  </div>;
};