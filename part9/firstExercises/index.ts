import express from "express";
import { calculateBmi } from "./calculateBmi";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi?", (req, res) => {
  console.log("Request Query", req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!(height && weight)) {
    res
      .status(400)
      .send({ error: "Weight and Height must be provided and be numbers" });
  }
  const bmi = calculateBmi(height, weight);
  res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
