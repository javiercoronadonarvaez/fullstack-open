import { useState } from "react";
import { useField } from "../hooks/hook";
import { Diagnosis, EntryWithoutId } from "../types";
import axios from "axios";
import patientService from "../services/patients";

export interface Props {
  diagnosis: Diagnosis[];
  patientId: string;
  show: string;
}

const NewHealthCheckEntry = ({ diagnosis, show, patientId }: Props) => {
  //const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  //   const openModal = (): void => setModalOpen(true);

  //   const closeModal = (): void => {
  //     setModalOpen(false);
  //     setError(undefined);
  //   };
  const description = useField("text");
  const date = useField("date");
  const specialist = useField("text");
  //const diagnosisCode = useField("text");

  const handleSubmit = async () => {
    try {
      const newEntry = {
        description: description.input.value,
        date: date.input.value,
        specialist: specialist.input.value,
        type: "HealthCheck",
        healthCheckRating: 0,
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
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const display =
    show === "New Health Check Entry" ? { display: "" } : { display: "none" };

  return (
    <div style={display}>
      <form onSubmit={handleSubmit}>
        <p>
          Description <input {...description.input} />
        </p>
        <p>
          Date <input {...date.input} />
        </p>
        <p>
          Specialist <input {...specialist.input} />
        </p>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default NewHealthCheckEntry;
