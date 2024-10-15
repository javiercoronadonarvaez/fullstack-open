import { Patient, Diagnosis, Entry } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkIcon from "@mui/icons-material/Work";

interface IndividualPatient {
  patient: Patient | null | undefined;
  diagnosis: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientInfo = ({ patient, diagnosis }: IndividualPatient) => {
  if (!patient) {
    return <p>Patient not found.</p>;
  }

  //const entries = patient.entries ? patient.entries[0] : null;
  const entries = patient.entries ? patient.entries : null;

  const diagnosisMatcher = (diagnosisCode: string) => {
    const matchedDiagnosis = diagnosis.find(
      (diag) => diag.code === diagnosisCode
    );
    return matchedDiagnosis?.name;
  };

  const entryDetailsFetcher = (entry: Entry) => {
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
                {entry.diagnosisCodes.map((diagnosis) => (
                  <li key={diagnosis}>
                    {diagnosis} {diagnosisMatcher(diagnosis)}
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
                {entry.diagnosisCodes.map((diagnosis) => (
                  <li key={diagnosis}>
                    {diagnosis} {diagnosisMatcher(diagnosis)}
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
              {entry.date} <MedicalInformationIcon />{" "}
              <em>{entry.description}</em>
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
                {entry.diagnosisCodes.map((diagnosis) => (
                  <li key={diagnosis}>
                    {diagnosis} {diagnosisMatcher(diagnosis)}
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

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      {/* {entries ? (
        <div>
          <p>
            {entries.date}: <em>{entries.description}</em>
          </p>
          {entries.diagnosisCodes ? (
            <div>
              <ul>
                {entries.diagnosisCodes.map((diagnosis) => (
                  <li key={diagnosis}>
                    {diagnosis} {diagnosisMatcher(diagnosis)}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null} */}
      {entries
        ? entries.map((entry) => {
            const details = entryDetailsFetcher(entry);
            return details;
          })
        : null}
    </div>
  );
};

export default PatientInfo;
