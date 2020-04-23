const { Router } = require("express");
const router = new Router();
const Expense = require("./model");

router.post("/expense", async (req, res, next) => {
  try {
    console.log("************req.body**********", req.body);
    const saveExpense = await Expense.create({
      type: req.body.type,
      date: req.body.date,
      paidTo: req.body.paidTo,
      amountDue: req.body.amountDue,
      amountPaid: req.body.amountPaid,
      balAmount: req.body.balAmount,
    });
    res.send(saveExpense);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
