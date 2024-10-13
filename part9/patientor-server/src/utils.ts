import { NewPatientEntry, Gender } from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.string().date(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};
