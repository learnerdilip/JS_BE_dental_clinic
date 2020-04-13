const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const patientRouter = require("./src/patients/router");
const visitRouter = require("./src/visits/router");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(patientRouter);
app.use(visitRouter);

// app.use("/", () => console.log("Home"));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("mongoose activated")
);

app.listen(PORT, () => console.log(`Express server running on port: ${PORT}`));
