import { HospitalEntry } from "../types";

interface LocalProps {
  entry: HospitalEntry;
}

export const HospitalEntryDetails = ({entry}: LocalProps) => {
  return <div>
    <p>discharge date: {entry.discharge.date}</p>
    <p>discharge criteria: {entry.discharge.criteria}</p>
  </div>;
};