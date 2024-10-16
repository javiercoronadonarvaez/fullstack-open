import { Patient, Diagnosis } from "../types";
import { entryDetailsFetcher } from "../utils/utils";
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

  const entries = patient.entries ? patient.entries : null;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      {entries
        ? entries.map((entry) => {
            const details = entryDetailsFetcher({ entry, diagnosis });
            return details;
          })
        : null}
    </div>
  );
};

export default PatientInfo;
