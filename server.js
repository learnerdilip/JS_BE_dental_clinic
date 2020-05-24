const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const patientRouter = require("./src/patients/router");
const patientVisitRouter = require("./src/patientvisit/router");
const procedureRouter = require("./src/procedures/router");
const indentRouter = require("./src/indents/router");
const inventoryRouter = require("./src/inventory/router");
const expenseRouter = require("./src/expenses/router");
const labworkRouter = require("./src/labworks/router");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(patientRouter);
app.use(patientVisitRouter);

app.use(indentRouter);
app.use(inventoryRouter);
app.use(expenseRouter);
app.use(labworkRouter);
app.use(procedureRouter);

// app.use("/", () => console.log("Home"));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("mongoose activated")
);

app.listen(port, () => console.log(`Express server running on port: ${port}`));
