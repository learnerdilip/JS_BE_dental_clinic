const { Router } = require("express");
const router = new Router();
const PatientVisit = require("./model");
const Medicines = require("./medicinemodel");

router.post("/patientvisit", async (req, res, next) => {
  try {
    //
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
