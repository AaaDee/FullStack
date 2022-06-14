
import { Entry } from "../types";
import { assertNever } from "../utils";
import { HealthCheckEntryDetails } from "./HealthCheckDetails";
import { HospitalEntryDetails } from "./HospitalEntryDetails";
import { OccupationalEntryDetails } from "./OccupationalEntryDetails";

interface LocalProps {
  entry: Entry
}

export const EntryDetails = ({ entry }: LocalProps) => {
  switch(entry.type) {
    case("Hospital"):
      return <HospitalEntryDetails entry={entry}/>;
    case("OccupationalHealthcare"):
      return <OccupationalEntryDetails entry={entry}/>;
    case("HealthCheck"):
      return <HealthCheckEntryDetails entry={entry}/>;
    default:
      return assertNever(entry);
  }
  
};