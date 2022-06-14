import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import EntryForm, { HealthCheckFormValues } from "../components/EntryForm";
import { EntryListing } from "../components/EntryListing";
import { apiBaseUrl } from "../constants";
import { addEntry, addPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient: Patient = patients[id as string];
  
  const submitNewEntry = async (values: HealthCheckFormValues) => {
    const patientId = id || '';
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(id || '', newEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };
  
  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: apiPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        patients[id] = apiPatient;
        dispatch(addPatient(apiPatient));
      } catch (e) {
        console.error(e);
      }
    };
    if (id && patient && !patient.ssn) {
      void fetchPatient(id);
    }
  }, [dispatch, id, patient]);

  if (!patient) {
    return null;
  }

  return <div className="App">
    <h2>{patient.name}</h2>
    <p>gender: {patient.gender}</p>
    <p>ssn: {patient.ssn}</p>
    <p>occupation: {patient.occupation}</p>
    <h3>entries</h3>
    {patient.entries.map(entry => 
      <EntryListing key={entry.id} entry={entry}/>
    )}
    <EntryForm onSubmit={submitNewEntry} />
  </div>;
};

export default PatientPage;