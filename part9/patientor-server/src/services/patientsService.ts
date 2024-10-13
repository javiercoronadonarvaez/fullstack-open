import patients from "../../data/patients";

import { PatientFormValues } from "../types";

const getSelectedPatientAtributes = (): PatientFormValues[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

export default {
  getSelectedPatientAtributes,
};
