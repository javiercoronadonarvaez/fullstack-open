import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../types";
import { entryDetailsFetcher } from "../utils/utils";
import NewHealthCheckEntry from "./NewHealthCheckEntry";
import NewHospitalEntry from "./NewHospitalEntry";
import NewOccupationalHealthcareEntry from "./NewOccupationalHealthCareEntry";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

interface IndividualPatient {
  patient: Patient | null | undefined;
  diagnosis: Diagnosis[];
}

const PatientInfo = ({ patient, diagnosis }: IndividualPatient) => {
  const [entryFormat, setEntryFormat] = useState<string>("");
  const [entries, setEntries] = useState<Entry[] | undefined>();

  useEffect(() => {
    if (patient?.entries) {
      setEntries(patient.entries);
    }
  }, [patient]);

  if (!patient) {
    return <p>Patient Not Found</p>;
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <button onClick={() => setEntryFormat("New Health Check Entry")}>
        New Health Check Entry
      </button>
      <button onClick={() => setEntryFormat("New Hospital Entry")}>
        New Hospital Entry
      </button>
      <button
        onClick={() => setEntryFormat("New Occupational Healthcare Entry")}
      >
        New Occupational Healthcare Entry
      </button>
      <NewHealthCheckEntry
        diagnosis={diagnosis}
        show={entryFormat}
        patientId={patient.id}
        setEntryFormat={setEntryFormat}
      />
      <NewHospitalEntry
        diagnosis={diagnosis}
        show={entryFormat}
        patientId={patient.id}
        setEntryFormat={setEntryFormat}
      />
      <NewOccupationalHealthcareEntry
        diagnosis={diagnosis}
        show={entryFormat}
        patientId={patient.id}
        setEntryFormat={setEntryFormat}
      />
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
