import express from "express";
import { Response } from "express";
import { Patient } from "../types";

import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getSelectedPatientAttributes());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newAddedEntry = patientsService.addPatient(newPatientEntry);
    res.json(newAddedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
