import { Entry, Diagnosis } from "../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkIcon from "@mui/icons-material/Work";

interface AllDiagnosis {
  diagnosis: Diagnosis[];
  diagnosisCode: string;
}

interface EntryDetails {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const diagnosisMatcher = ({ diagnosis, diagnosisCode }: AllDiagnosis) => {
  const matchedDiagnosis = diagnosis.find(
    (diag) => diag.code === diagnosisCode
  );
  return matchedDiagnosis?.name;
};

export const entryDetailsFetcher = ({ entry, diagnosis }: EntryDetails) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div
          key={entry.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p>
            {entry.date} <HealthAndSafetyIcon /> <em>{entry.description}</em>
          </p>
          <p>Health Check Rating: {entry.healthCheckRating}</p>
          <p>Diagnosis by {entry.specialist}</p>
          <p>
            <strong>Diagnosis Codes</strong>
          </p>
          {entry.diagnosisCodes ? (
            <ul>
              {entry.diagnosisCodes.map((diagnosisCode) => (
                <li key={diagnosisCode}>
                  {diagnosisCode}{" "}
                  {diagnosisMatcher({ diagnosis, diagnosisCode })}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    case "Hospital":
      return (
        <div
          key={entry.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p>
            {entry.date} <LocalHospitalIcon /> <em>{entry.description}</em>
          </p>
          <p>Diagnosis by {entry.specialist}</p>
          <p>Discharge Date: {entry.discharge.date}</p>
          <p>
            <strong>Diagnosis Codes</strong>
          </p>
          {entry.diagnosisCodes ? (
            <ul>
              {entry.diagnosisCodes.map((diagnosisCode) => (
                <li key={diagnosisCode}>
                  {diagnosisCode}{" "}
                  {diagnosisMatcher({ diagnosis, diagnosisCode })}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div
          key={entry.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        >
          <p>
            {entry.date} <MedicalInformationIcon /> <em>{entry.description}</em>
          </p>
          <p>
            Employed by: {entry.employerName} <WorkIcon />
          </p>
          <p>
            <strong>Sick Leave:</strong>
          </p>
          <ul>
            <li>Start Date: {entry.sickLeave?.startDate}</li>
            <li>End Date: {entry.sickLeave?.endDate}</li>
          </ul>
          <p>Diagnosis by {entry.specialist}</p>
          <p>
            <strong>Diagnosis Codes</strong>
          </p>
          {entry.diagnosisCodes ? (
            <ul>
              {entry.diagnosisCodes.map((diagnosisCode) => (
                <li key={diagnosisCode}>
                  {diagnosisCode}{" "}
                  {diagnosisMatcher({ diagnosis, diagnosisCode })}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    default:
      return assertNever(entry);
  }
};
