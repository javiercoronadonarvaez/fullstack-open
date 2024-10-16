import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
} from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
});

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Description missing");
  }

  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Criteria missing");
  }

  return criteria;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Specialist missing");
  }

  return specialist;
};

const parseEmployer = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Employer Name missing");
  }

  return employerName;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (typeof healthCheckRating !== "number") {
    throw new Error(
      "Health check rating must be a number, received: " + healthCheckRating
    );
  }

  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error("Invalid health check rating: " + healthCheckRating);
  }

  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object") {
    // we will just trust the data to be in correct form
    console.log(typeof object);
    return [] as Array<Diagnosis["code"]>;
  }
  console.log("FOUND");
  return object as Array<Diagnosis["code"]>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : [],
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...baseEntry,
            type: "HealthCheck", // Narrow type explicitly here
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        throw new Error("Missing healthCheckRating for HealthCheck entry");

      case "Hospital":
        if ("discharge" in object && typeof object.discharge === "object") {
          const discharge = object.discharge as {
            date: unknown;
            criteria: unknown;
          };
          return {
            ...baseEntry,
            type: "Hospital", // Narrow type explicitly here
            discharge: {
              date: parseDate(discharge.date),
              criteria: parseCriteria(discharge.criteria),
            },
          };
        }
        throw new Error("Missing or invalid discharge for Hospital entry");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          console.log("OBJECT", object);
          const entry = {
            ...baseEntry,
            type: "OccupationalHealthcare", // Narrow type explicitly here
            employerName: parseEmployer(object.employerName),
          } as EntryWithoutId;

          if ("sickLeave" in object) {
            console.log(object.sickLeave);
            const sickLeave = object.sickLeave as {
              startDate: unknown;
              endDate: unknown;
            };
            return {
              ...baseEntry,
              type: "OccupationalHealthcare", // Narrow type explicitly here
              employerName: parseEmployer(object.employerName),
              sickLeave: {
                startDate: parseDate(sickLeave.startDate),
                endDate: parseDate(sickLeave.endDate),
              },
            };
          }

          return entry;
        }
        throw new Error(
          "Missing employerName for OccupationalHealthcare entry"
        );

      default:
        throw new Error(`Incorrect or missing type`);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};
