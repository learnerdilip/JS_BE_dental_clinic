const { Router } = require("express");
const router = new Router();
const Visit = require("./model");

router.post("/toothwork", async (req, res, next) => {
  try {
    // console.log("********", req.body);
    const createtoothwork = await Visit.create({
      patientId: req.body.patientId,
      VisitDate: req.body.VisitDate,
      toothNo: req.body.toothNo,
      diagnosis: req.body.diagnosis,
      treatmentPlan: req.body.treatmentPlan,
      workDone: req.body.workDone,
      workDate: req.body.workDate,
      estimate: req.body.estimate,
      received: req.body.received,
      balance: req.body.balance,
      recieptNo: req.body.recieptNo,
    });
    res.send({
      message: "The record was created successfully!",
      data: createtoothwork,
    });
  } catch {
    (error) => console.error(error);
  }
});

router.get("/toothwork", async (req, res, next) => {
  try {
    const patientVisitList = await Visit.find({ patient: req.query.id });
    // console.log("**the list of visits**", patientVisitList);
    res.send(patientVisitList);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
