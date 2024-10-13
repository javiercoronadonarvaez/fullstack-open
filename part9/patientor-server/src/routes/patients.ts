import express from "express";
import { Response } from "express";
import { Patient } from "../types";

import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getSelectedPatientAtributes());
});

export default router;
