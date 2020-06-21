const { Router } = require("express");
const router = new Router();
const Inventory = require("./inventory/model");
const Indent = require("./indents/model");
const Labwork = require("./labworks/model");
const PatientVisit = require("./patientvisit/model");
const Procedure = require("./procedures/model");
const Expense = require("./expenses/model");
const Patients = require("./patients/model");

var multer = require("multer");
var upload = multer({ dest: "src/" });

const CSVToJSON = require("csvtojson");
const { json } = require("body-parser");

router.get("/finance", async (req, res, next) => {
  try {
    const t0 = new Date(req.query.d2);
    const t10 = new Date(req.query.d1);
    // const t0 = new Date();
    // const nowmilli = new Date(t0).getTime();
    // const days = 10; //by default for last 10 days
    // const t10 = new Date(nowmilli - 3600000 * 24 * days);
    // console.log("t0 t10", t0, t10);
    // console.log("d1 d2", new Date(req.query.d1), new Date(req.query.d2));

    // (0) procedures list (paymentDate, amount, reason - patientId)
    const procedurePay = await Procedure.find({
      "payments.paymentDate": { $lte: t0, $gte: t10 },
    });
    const procedureFin = procedurePay
      .map((item) => item.payments)
      .reduce((sum, item) => {
        return [...sum, ...item];
      }, []);
    // res.send(procedureFin);

    // (1) patient consultation list (visitDate, amount, patientName)
    const consultPayList = await PatientVisit.find({
      Visitdate: { $lte: t0, $gte: t10 },
    });
    const visitFin = consultPayList.map((item) => {
      return {
        date: item.Visitdate,
        amount: item.consultationCost,
        reason: "Patient visit",
      };
    });
    // res.send(visitFin);

    // (3) Lab work (delivery date, amount, item)
    const labworkFind = await Labwork.find({
      paymentDate: { $lte: t0, $gte: t10 },
    });
    const labworkFin = labworkFind.map((item) => ({
      reason: `${item.workType} - Labwork`,
      amount: item.price,
      date: item.paymentDate,
    }));
    // res.send(labworkFin);

    // (2) Indent (amount, OrderDate, dealer)
    const indentPayments = await Indent.find({
      paid: { $gt: 0 },
      paymentDate: { $lte: t0, $gte: t10 },
    });
    const indentFin = indentPayments.map((item) => ({
      reason: item.dealer,
      amount: item.paid,
      date: item.paymentDate,
    }));
    // res.send(indentFin);

    // (4) expense (reason, amount, type)
    const expensePay = await Expense.find({ date: { $lte: t0, $gte: t10 } });
    const expenseFin = expensePay.map((item) => ({
      reason: `${item.type} - Expense`,
      amount: item.amountPaid,
      date: item.date,
    }));
    // res.send(expenseFin);

    // combining all together
    const ExpensesArr = [
      ...expenseFin,
      ...indentFin,
      ...labworkFin,
      ...procedureFin,
      ...visitFin,
    ].reduce((agg, ele) => {
      const dated = ele.date || ele.paymentDate;
      let millis = dated.setHours(0, 0, 0, 0);
      let aggKeys = Object.keys(agg);
      if (aggKeys.includes(`${millis}`)) {
        return { ...agg, [`${millis}`]: [...agg[`${millis}`], ele] };
      } else {
        return { ...agg, [millis]: [ele] };
      }
    }, {});

    const convertedArr = Object.entries(ExpensesArr)
      .map((item) => {
        let temp = new Date(parseInt(item[0])).toDateString();
        return { finDay: { date: temp, dateItems: item[1] } };
      })
      .sort(
        (b, a) =>
          new Date(a.finDay.date).getTime() - new Date(b.finDay.date).getTime()
      );
    res.send(convertedArr);
  } catch {
    (error) => console.error(error);
  }
});

// fileuploads
router.post(
  "/patientupload",
  upload.single("patients"),
  async (req, res, next) => {
    try {
      // console.log(req.file);
      const jsonArr = await CSVToJSON().fromFile(`${__dirname}/patient`);
      console.log(jsonArr);
      const promiseArr = jsonArr.map((item) => Patients.create(item));
      Promise.all(promiseArr).then((items) => console.log(items));
    } catch {
      (error) => console.error(error);
    }
  }
);

module.exports = router;
