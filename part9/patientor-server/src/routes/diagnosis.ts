import express from "express";
import { Response } from "express";
import { Diagnosis } from "../types";

import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getDiagnosis());
});

export default router;
