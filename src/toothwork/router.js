const { Router } = require("express");
const router = new Router();
const Tooth = require("./model");

router.post("/toothwork", async (req, res, next) => {
  try {
    // console.log("********", req.body);
    const createtoothwork = await Tooth.create({
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
    const patientVisitList = await Tooth.find({ patientId: req.query.id });
    res.send(patientVisitList);
  } catch {
    (error) => console.error(error);
  }
});

router.get("/lastmonthsale", async (req, res, next) => {
  try {
    const getdata = await Tooth.find({ workDate: new Date() });
    console.log(getdata);
    res.send(getdata);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
