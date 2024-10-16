import { useState } from "react";
import { useField } from "../hooks/hook";
import { Diagnosis, EntryWithoutId } from "../types";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Error from "./Error";
import axios from "axios";
import patientService from "../services/patients";

export interface Props {
  diagnosis: Diagnosis[];
  patientId: string;
  show: string;
}

const NewHealthCheckEntry = ({ diagnosis, show, patientId }: Props) => {
  const [error, setError] = useState<string>("");
  const [diagnosisCode, setDiagnosisCode] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);

  const description = useField("text");
  const date = useField("date");
  const specialist = useField("text");

  const diagnosisCodeOptions = diagnosis.map((diag) => ({
    value: diag.code,
    label: diag.code,
  }));

  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (diagnosisCode) {
      setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
      setDiagnosisCode("");
    }
  };

  const onCodeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      console.log("SELECTED VALUE", value);
      setDiagnosisCode(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const newEntry = {
        description: description.input.value,
        date: date.input.value,
        specialist: specialist.input.value,
        type: "HealthCheck",
        healthCheckRating: 0,
        diagnosisCodes: diagnosisCodes,
      } as unknown as EntryWithoutId;
      await patientService.updateEntry(patientId, newEntry);
      //setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          console.error(e);
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const mainStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
  };

  const display =
    show === "New Health Check Entry"
      ? { ...mainStyle, display: "" }
      : { ...mainStyle, display: "none" };

  return (
    <div style={display}>
      <p>
        <strong>New HealtchCheck Entry</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <Error error={error} setError={setError} />
        <p>
          Description <input {...description.input} />
        </p>
        <p>
          Date <input {...date.input} />
        </p>
        <p>
          Specialist <input {...specialist.input} />
        </p>
        Diagnosis Codes{" "}
        <Select
          label="Diagnostic Codes"
          fullWidth
          value={diagnosisCode}
          onChange={onCodeChange}
        >
          {diagnosisCodeOptions.map((diagnosisCode) => (
            <MenuItem key={diagnosisCode.label} value={diagnosisCode.value}>
              {diagnosisCode.value}
            </MenuItem>
          ))}
        </Select>
        <button onClick={onClick}>ADD CODE</button>
        <p>
          Selected Codes:{" "}
          {diagnosisCodes.map((diagnosisCode, index) =>
            index > 0 ? `, ${diagnosisCode}` : diagnosisCode
          )}
        </p>
        <button type="submit">ADD ENTRY</button>
      </form>
      <button>CANCEL</button>
    </div>
  );
};

export default NewHealthCheckEntry;
