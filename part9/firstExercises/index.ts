import express from "express";
import { calculateBmi } from "./calculateBmi";
import { exerciseAnalysis } from "./exerciseCalculator";
const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).send({ error: "parameters missing" });
  }
  if (isNaN(Number(target))) {
    res.status(400).send({ error: "Target needs to be a number" });
  }
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(daily_exercises[i]) || daily_exercises[i] === null) {
      res
        .status(400)
        .send({ error: "Arrays must be composed of numbers only" });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseAnalysis(daily_exercises, target);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
