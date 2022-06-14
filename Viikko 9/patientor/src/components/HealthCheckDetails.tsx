import { HealthCheckEntry } from "../types";

interface LocalProps {
  entry: HealthCheckEntry;
}

export const HealthCheckEntryDetails = ({entry}: LocalProps) => {
  return <div>
    <p>rating: {entry.healthCheckRating}</p>
  </div>;
};