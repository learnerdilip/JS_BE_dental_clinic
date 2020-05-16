const { Router } = require("express");
const router = new Router();
const PatientVisit = require("./model");

router.post("/patientvisit", async (req, res, next) => {
  try {
    // console.log("***consultation request******", req.body);
    const createPatientVisit = await PatientVisit.create({
      patientId: req.body.patientId,
      Visitdate: req.body.Visitdate,
      procedureEstimate: req.body.procedureEstimate,
      consultationCost: req.body.consultationCost,
      paymentMode: req.body.paymentMode,
      received: req.body.received,
      balance: req.body.balance,
      medicinePrescribed: [...req.body.medicinePrescribed],
      chiefComplaint: req.body.chiefComplaint,
      oralExamination: [...req.body.oralExamination],
      investigation: req.body.investigation,
      treatmentPlan: req.body.treatmentPlan,
      advice: req.body.advice,
    });
    // console.log("-----consultation created!!!----", createPatientVisit);
    res.send(createPatientVisit);
  } catch {
    (error) => console.error(error);
  }
});

router.get("/patientvisits", async (req, res, next) => {
  try {
    const patientvisitlist = await PatientVisit.find({
      patientId: req.query.patientid,
    });
    console.log("*the response for consultation list***", patientvisitlist);
    res.send(patientvisitlist);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
