import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NewPatient, PublicPatient, Patient, Entry } from "../types";

const patientData = patients;

const getPatients = (): PublicPatient[] => {
  const data: PublicPatient[] = patientData.map((patient: Patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries
    };
  });
  return data;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    ...newPatient,
    id: uuid()
  };
  patientData.push(patient);
  return(patient);
};

const addEntry = (id: string, newEntry: Entry): Entry => {
  const entry: Entry = {
    ...newEntry,
    id: uuid()
  };

  const oldPatient = patientData.find(patient => patient.id === id);
  if (!oldPatient) {
    throw new Error(`patient id ${id} not found`);
  }
  const updatedPatient = {
    ...oldPatient,
    entries: oldPatient?.entries.push(entry)
  };

  patientData.map(patient => patient.id === id ? updatedPatient : patient);

  return(entry);
};

const findOne = (id: string): Patient | undefined => {
  const patient = patientData.find((patient: Patient) => patient.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  addEntry,
  findOne
};