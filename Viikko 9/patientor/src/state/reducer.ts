import { Diagnosis, Entry, Patient } from "../types";
import { State } from "./state";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      id: string,
      entry: Entry
    };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: action.payload
          };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const id = action.payload.id;
      const patient = state.patients[id];
      return {
        ...state,
        patients: {
          ...state.patients,
          [id]: {
            ...patient,
            entries: [
              ...patient.entries,
              action.payload.entry
            ]
          }
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addEntry= (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      id, entry
    }
  };
};
