import { Entry, Gender, HealthCheckRating, NewPatient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toNewPatient(object: any): NewPatient {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'ssn'),
    entries: [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toNewEntry(object: any): Entry {
  const type = parseString(object.type, 'type');
  const baseEntry = {
    id: '',
    description:  parseString(object.description, 'description'),
    date:  parseString(object.date, 'date'),
    specialist:  parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseStringArray(object.diagnosisCode)
  };

  switch (type) {
    case ('HealthCheck'):
      return {
        ...baseEntry,
        type: type,
        healthCheckRating: checkIfExists(object.healthCheckRating) as HealthCheckRating
      };
    case ('Hospital'):
      return {
        ...baseEntry,
        type: type,
        discharge: checkIfExists(object.discharge) as {date: string, criteria: string}
      };
    case ('OccupationalHealthcare'):
      return {
        ...baseEntry,
        type: type,
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave: object.sickLeave as {startDate: string, endDate: string } | undefined
      };
    default:
      throw new Error('incorrect type');
  } 
  
}

function parseString(input: unknown, type: string): string {
  if (!input || typeof input !== 'string') {
    throw new Error(`incorrect input for ${type}`);
  }
  return input;
}

const parseDate = (date: unknown): string => {
  if (!date || typeof date !== 'string' || !Date.parse(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseStringArray = (object: unknown): string[] | undefined => {
  if (object === undefined) return object;
  if (!Array.isArray(object)) {
    throw new Error('not an array');
  }
  return object.map(code => parseString(code, 'diagnosisCode'));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (Gender: unknown): Gender => {
  if (!Gender || !isGender(Gender)) {
      throw new Error('Incorrect or missing Gender: ' + Gender);
  }
  return Gender;
};

const checkIfExists = (object: unknown): unknown => {
  if (object === undefined) {
    throw new Error(`missing input`);
  }
  return object;
};
