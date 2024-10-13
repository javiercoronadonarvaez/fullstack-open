import { z } from "zod";
import { NewEntrySchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientFormValues = Omit<Patient, "ssn">;
// export type NewPatientEntry = Omit<Patient, "id">;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
