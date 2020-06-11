const { Router } = require("express");
const router = new Router();
const Inventory = require("./inventory/model");
const Indent = require("./indents/model");
const Labwork = require("./labworks/model");
const PatientVisit = require("./patientvisit/model");
const Procedure = require("./procedures/model");
const Expense = require("./expenses/model");

router.get("/finance", async (req, res, next) => {
  try {
    const t0 = new Date();
    const nowmilli = new Date(t0).getTime();
    const days = 10; //by default for last 10 days
    const t10 = new Date(nowmilli - 3600000 * 24 * days);
    console.log(">>>>>>>>>>> t1, t10<<<<<<<<<", t0, t10);
    console.log("d1 %%%%%%%%%%%% d2", req.query.d1, req.query.d2);

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

    // (3) Lab work (delivery date, amount, item)
    const labworkFind = await Labwork.find();
    const labworkFin = labworkFind.map((item) => ({
      reason: item.labName,
      amount: item.price,
      date: item.paymentDate,
    }));
    // res.send(labworkFin);

    // (2) Indent (amount, OrderDate, dealer)
    const indentPayments = await Indent.find({ paid: { $gt: 0 } });
    const indentFin = indentPayments.map((item) => ({
      reason: item.dealer,
      amount: item.paid,
      date: item.paymentDate,
    }));
    // res.send(indentFin);

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

    // (4) expense (reason, amount, type)
    const expensePay = await Expense.find({ date: { $lte: t0, $gte: t10 } });
    const expenseFin = expensePay.map((item) => ({
      reason: item.type,
      amount: item.amountPaid,
      date: item.date,
    }));
    // res.send(expenseFin);
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
    // console.log(Object.entries(ExpensesArr));
    const convertedArr = Object.entries(ExpensesArr).map((item) => {
      // let temp = new Date(parseInt(item[0]));
      let temp = new Date(parseInt(item[0])).toDateString();
      // console.log(temp, item[1]);
      return { finDay: { date: temp, dateItems: item[1] } };
      // return { [temp]: item[1] };
    });

    res.send(convertedArr);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
