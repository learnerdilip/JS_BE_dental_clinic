const { Router } = require("express");
const router = new Router();
const Expense = require("./model");

router.post("/expense", async (req, res, next) => {
  try {
    // console.log("************req.body**********", req.body);
    const saveExpense = await Expense.create({
      type: req.body.type,
      date: req.body.date,
      paidTo: req.body.paidTo,
      paymentMode: req.body.paymentMode,
      amountPaid: req.body.amountPaid,
    });
    res.send(saveExpense);
  } catch {
    (error) => console.error(error);
  }
});

router.get("/expense", async (req, res, next) => {
  try {
    const expenseList = await Expense.find();
    res.send(expenseList);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
