import { Patient, Diagnosis } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

interface IndividualPatient {
  patient: Patient | null | undefined;
  diagnosis: Diagnosis[];
}

const PatientInfo = ({ patient, diagnosis }: IndividualPatient) => {
  if (!patient) {
    return <p>Patient not found.</p>;
  }

  const entries = patient.entries ? patient.entries[0] : null;
  const diagnosisMatcher = (diagnosisCode: string) => {
    const matchedDiagnosis = diagnosis.find(
      (diag) => diag.code === diagnosisCode
    );
    return matchedDiagnosis?.name;
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
      {entries ? (
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
      ) : null}
    </div>
  );
};

export default PatientInfo;
