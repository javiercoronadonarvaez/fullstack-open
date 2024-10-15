import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/Patient";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientListAndDiagnosis = async () => {
      const patients = await patientService.getAll();
      const allDiagnosis = await diagnosisService.getAll();
      setPatients(patients);
      setDiagnosis(allDiagnosis);
    };
    void fetchPatientListAndDiagnosis();
  }, []);

  const match = useMatch("/patients/:id");

  useEffect(() => {
    if (match) {
      const retrievePatient = async () => {
        const retrievedPatient = await patientService.getSinglePatient(
          match.params.id
        );
        setPatient(retrievedPatient);
      };
      void retrievePatient();
    }
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientInfo patient={patient} diagnosis={diagnosis} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
