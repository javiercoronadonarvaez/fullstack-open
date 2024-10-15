import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import { NonSensitivePatient, NewPatientEntry, Patient } from "../types";

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

const getAllPatients = (): Patient[] => {
  console.log(patients);
  return patients.map((patient) => {
    const updatedPatient = { ...patient, entries: [] };
    return updatedPatient;
  });
};

const getPatientAttributes = (id: string): Patient | null => {
  const patient = patients.find((patient) => patient.id === id);
  return patient ? { ...patient, entries: [] } : null;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAllPatients,
  getSelectedPatientAttributes,
  addPatient,
  getPatientAttributes,
};
