import express, { Request, Response, NextFunction } from "express";
import { Patient, NewPatientEntry } from "../types";
import { NewEntrySchema } from "../utils";
import { z } from "zod";

import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getAllPatients());
});

router.get("/:id", (req, res: Response) => {
  const id: string = req.params.id;
  const patient = patientsService.getPatientAttributes(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
