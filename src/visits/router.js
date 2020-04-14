const { Router } = require("express");
const router = new Router();
const Visit = require("./model");

router.post("/visit", async (req, res, next) => {
  try {
    console.log("********", req.body);
    const createVisit = await Visit.create({
      patient: req.body.patient,
      currentDateTime: req.body.currentDateTime,
      description: req.body.description,
      prescription: req.body.prescription,
      cost: req.body.cost,
      paid: req.body.paid,
      balance: req.body.balance,
      followupDateTime: req.body.followupDateTime,
    });
    res.send({ message: "The record was created successfully!" });
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
