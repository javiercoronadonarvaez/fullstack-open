import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  EntryWithoutId,
} from "../types";

const getSelectedPatientAttributes = (): NonSensitivePatient[] => {
  console.log(patients);
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

// const getAllPatients = (): Patient[] => {
//   console.log(patients);
//   return patients.map((patient) => {
//     const updatedPatient = { ...patient, entries: [] };
//     return updatedPatient;
//   });
// };

const getAllPatients = (): Patient[] => {
  console.log(patients);
  return patients;
};

// const getPatientAttributes = (id: string): Patient | null => {
//   const patient = patients.find((patient) => patient.id === id);
//   return patient ? { ...patient, entries: [] } : null;
// };
const getPatientAttributes = (id: string): Patient | null => {
  const patient = patients.find((patient) => patient.id === id);
  return patient ? patient : null;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, id: string): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((patient) => patient.id === id);
  patient?.entries?.push(newEntry);

  return patient;
};

export default {
  getAllPatients,
  getSelectedPatientAttributes,
  addPatient,
  getPatientAttributes,
  addEntry,
};
