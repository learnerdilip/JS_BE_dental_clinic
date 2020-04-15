const { Router } = require("express");
const router = new Router();
const Patient = require("./model");

router.post("/patient", async (req, res, next) => {
  try {
    const createpatient = await Patient.create({
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      medicalHistory: req.body.medicalHistory,
      allergies: req.body.allergies,
      habits: req.body.habits,
      dentalHistory: req.body.dentalHistory,
    });
    res.send({
      message: "The record was created successfully!",
      data: createpatient,
    });
  } catch {
    (error) => console.error(error);
  }
});

router.get("/patients", async (req, res, next) => {
  try {
    const patientList = await Patient.find();
    console.log("***the patients list***", patientList);
    res.send(patientList);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
