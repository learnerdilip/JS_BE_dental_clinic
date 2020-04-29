const { Router } = require("express");
const router = new Router();
const Indent = require("./model");

router.post("/indent", async (req, res, next) => {
  try {
    const saveIndent = await Indent.create({
      item: req.body.item,
      qytBought: req.body.qytBought,
      purchaseDate: req.body.purchaseDate,
      dealersName: req.body.dealersName,
      paymentMode: req.body.paymentMode,
      totalCost: req.body.totalCost,
      paid: req.body.paid,
      balance: req.body.balance,
    });
    res.send(saveIndent);
  } catch {
    (error) => console.error(error);
  }
});

router.get("/indent", async (req, res, next) => {
  try {
    const indetList = await Indent.find();
    res.send(indetList);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
