/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import cors from "cors";
//import { Patient } from "./patients";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  // res.send({
  //   patients: [
  //     {
  //       id: "1",
  //       name: "Jorge Montes",
  //       occupation: "Developer",
  //       gender: "Male",
  //       ssn: "1234",
  //       dateOfBirth: "13/09/1989",
  //     },
  //   ],
  // });
  res.send([
    {
      id: "1",
      name: "Jorge Montes",
      occupation: "Developer",
      gender: "Male",
      ssn: "1234",
      dateOfBirth: "13/09/1989",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
