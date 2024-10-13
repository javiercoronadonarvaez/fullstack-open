import express from "express";
import { Response } from "express";
import { DiaryEntry } from "../types";

import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
