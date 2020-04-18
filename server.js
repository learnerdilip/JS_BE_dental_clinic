const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const patientRouter = require("./src/patients/router");
const toothworkRouter = require("./src/toothwork/router");
const indentRouter = require("./src/indents/router");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(patientRouter);
app.use(toothworkRouter);
app.use(indentRouter);

// app.use("/", () => console.log("Home"));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("mongoose activated")
);

app.listen(port, () => console.log(`Express server running on port: ${port}`));
