import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

interface IndividualPatient {
  patient: Patient | null | undefined;
}

const PatientInfo = ({ patient }: IndividualPatient) => {
  if (!patient) {
    return <p>Patient not found.</p>;
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfo;
