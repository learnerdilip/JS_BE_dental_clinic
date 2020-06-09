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
    console.log("now & -10 days:", t0, t10);

    // (0) procedures list (paymentDate, amount, reason - patientId)
    const procedurePay = await Procedure.find({
      "payments.paymentDate": { $lte: t0, $gte: t10 },
    });
    const paymentList = procedurePay
      .map((item) => item.payments)
      .reduce((sum, item) => {
        return [...sum, ...item];
      }, []);
    // res.send(paymentList);

    // (3) Lab work (delivery date, amount, item)
    const labworkFind = await Labwork.find();
    const labsData = labworkFind.map((item) => ({
      reason: item.labName,
      amount: item.price,
      date: item.paymentDate,
    }));
    // res.send(labsData);

    // (2) Indent (amount, OrderDate, dealer)
    const indentPayments = await Indent.find({ paid: { $gt: 0 } });
    const indentpaid = indentPayments.map((item) => ({
      reason: item.dealer,
      amount: item.paid,
      date: item.paymentDate,
    }));
    // res.send(indentpaid);

    // (1) patient consultation list (visitDate, amount, patientName)
    const consultPayList = await PatientVisit.find({
      Visitdate: { $lte: t0, $gte: t10 },
    });
    console.log(consultPayList);
    const visitfeelist = consultPayList.map((item) => {
      return {
        date: item.Visitdate,
        amount: item.consultationCost,
        reason: item.patientId,
      };
    });
    // res.send(visitfeelist);

    // (4) expense (reason, amount, type)
    const expensePay = await Expense.find({ date: { $lte: t0, $gte: t10 } });
    const expenseFin = expensePay.map((item) => ({
      reason: item.type,
      amount: item.amountPaid,
      date: item.date,
    }));
    // res.send(expenseFin);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
