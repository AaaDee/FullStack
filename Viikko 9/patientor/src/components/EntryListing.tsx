import { useStateValue } from "../state";
import { Entry } from "../types";
import { EntryDetails } from "./EntryDetails";

interface LocalProps {
  entry: Entry
}

export const EntryListing = ({ entry }: LocalProps) => {
  const [{ diagnoses }, ] = useStateValue();
  const codes = entry.diagnosisCodes || [];
  
  const patientDiagnoses = codes.map(code => diagnoses.find(diagnosis => diagnosis.code === code) || {
    code: code,
    name: ''
  });

  return <div>
    <p>{entry.date} {entry.description}</p>
    <ul>
      {patientDiagnoses.map(diagnosis => {
        return (
          <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
        );}
      )}
    </ul>
    <EntryDetails entry={entry}/>
  </div>;
};