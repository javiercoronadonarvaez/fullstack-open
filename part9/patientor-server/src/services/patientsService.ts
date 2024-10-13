import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import { PatientFormValues, NewPatientEntry, Patient } from "../types";

const getSelectedPatientAttributes = (): PatientFormValues[] => {
  console.log(patients);
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getSelectedPatientAttributes,
  addPatient,
};
