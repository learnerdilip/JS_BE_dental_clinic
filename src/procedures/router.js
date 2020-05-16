const { Router } = require("express");
const router = new Router();
const ProcedureWork = require("./model");

router.post("/procedurework", async (req, res, next) => {
  try {
    // console.log("----procedure from FE--", req.body);
    const createProcedureWork = await ProcedureWork.create({
      patientId: req.body.patientId,
      procedureDate: req.body.procedureDate,
      toothNo: req.body.toothNo,
      diagnosis: req.body.diagnosis,
      treatmentPlan: req.body.treatmentPlan,
      procedures: [...req.body.procedures],
      procedureCost: req.body.procedureCost,
      note: req.body.note,
      toothimage: req.body.toothimage,
    });
    // console.log("---sending procedure---", createProcedureWork);
    res.send(createProcedureWork);
  } catch {
    (error) => next(error);
  }
});

router.get("/procedurework", async (req, res, next) => {
  try {
    // console.log(req.query);
    const procedureList = await ProcedureWork.find({
      patientId: req.query.patientid,
    });
    // console.log(procedureList);
    res.send(procedureList);
  } catch {
    (error) => next(error);
  }
});

module.exports = router;
