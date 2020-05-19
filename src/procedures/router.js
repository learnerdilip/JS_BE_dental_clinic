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
    // console.log("--- procedure created---", createProcedureWork);
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
    // console.log("procedureList---------", procedureList);
    res.send(procedureList);
  } catch {
    (error) => next(error);
  }
});

router.patch("/procedurework", async (req, res, next) => {
  try {
    const procedureFind = await ProcedureWork.findOne({
      _id: req.query.procedureid,
    });

    const newProcedure = procedureFind.procedures.map((item) => {
      if (item._id == req.body._id) {
        return req.body;
      } else {
        return item;
      }
    });
    // console.log("Changed?---------", newProcedure);
    const updateProcedure = await ProcedureWork.update(
      { _id: req.query.procedureid },
      {
        procedures: [...newProcedure],
      }
    );
  } catch {
    (error) => next(error);
  }
});

module.exports = router;
