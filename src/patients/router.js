const { Router } = require("express");
const router = new Router();
const Patient = require("./model");

const pdf = require("html-pdf");
const pdfTemplate = require("../documents");

const fs = require("fs");

router.post("/patient", async (req, res, next) => {
  try {
    // console.log("***patient data from FE***", req.body);
    const createpatient = await Patient.create({
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      medicalHistory: req.body.medicalHistory,
      allergies: req.body.allergies,
      habits: req.body.habits,
      dentalHistory: req.body.dentalHistory,
      maritalStatus: req.body.maritalStatus,
      profession: req.body.profession,
      mobileNo: req.body.mobileNo,
      bloodGroup: req.body.bloodGroup,
      email: req.body.email,
      appointmentDate: req.body.appointmentDate,
    });
    res.send({
      message: "The record was created successfully!",
      data: createpatient,
    });
  } catch {
    (error) => console.error(error);
  }
});

router.patch("/patient", async (req, res, next) => {
  try {
    // filtering the fields that need update
    const patientDetailUpdate = Object.entries(req.body)
      .filter((item) => item[1])
      .reduce((agg, item) => {
        return { ...agg, [item[0]]: item[1] };
      }, {});
    // console.log("*the filtered details ***", patientDetailUpdate);
    const updatePatient = await Patient.update(
      { _id: patientDetailUpdate._id },
      patientDetailUpdate
    );

    res.send({ message: "successful updation" });
  } catch {
    (error) => console.error(error);
  }
});

router.get("/patients", async (req, res, next) => {
  try {
    const patientList = await Patient.find();
    // console.log("***the patients list***", patientList);
    res.send(patientList);
  } catch {
    (error) => console.error(error.res);
  }
});

router.post("/create-pdf", async (req, res, next) => {
  try {
    // console.log("***req.body**", req.body);
    pdf
      .create(pdfTemplate(req.body.item, req.body.patient), {})
      .toFile("src/patients/temp.pdf", (err) => {
        if (err) {
          res.send(Promise.reject());
        }
        res.send(Promise.resolve());
      });
  } catch {
    (error) => console.error(error);
  }
});

router.get("/fetch-pdf", async (req, res, next) => {
  res.sendFile(`${__dirname}/temp.pdf`);
});

router.get("/delete-pdf", async (req, res, next) => {
  fs.unlinkSync("src/patients/temp.pdf");
});

module.exports = router;
