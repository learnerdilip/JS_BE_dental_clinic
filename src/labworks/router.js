const { Router } = require("express");
const router = new Router();
const Labwork = require("./model");

router.get("/labwork", async (req, res, next) => {
  try {
    const labworkList = await Labwork.find();
    res.send(labworkList);
  } catch {
    (error) => console.error(error);
  }
});

router.post("/labwork", async (req, res, next) => {
  try {
    const createLabwork = await Labwork.create({
      labName: req.body.labName,
      patientName: req.body.patientName,
      workType: req.body.workType,
      collectionDate: req.body.collectionDate,
      deliveryDate: req.body.deliveryDate,
      itemSent: req.body.itemSent,
      itemReceived: req.body.itemReceived,
      note: req.body.note,
      price: req.body.price,
      status: req.body.status,
      paymentDate: req.body.paymentDate,
    });
    res.send({
      message: "The record was created successfully!",
      data: createLabwork,
    });
  } catch {
    (error) => console.error(error);
  }
});

router.patch("/labwork", async (req, res, next) => {
  try {
    // console.log("--the request ofr labwork edit---", req.body);
    const tempLabwork = { ...req.body };
    delete tempLabwork._id;
    const updateLabwork = await Labwork.update(
      { _id: req.body._id },
      tempLabwork
    );
    res.send({ message: "successful updation" });
  } catch {
    (error) => console.error(error);
  }
});

router.post("/labworkdates", async (req, res, next) => {
  try {
    // console.log("----THE DATES REQUEST-----", req.body);
    const starttonow = await Labwork.find({
      collectionDate: { $gt: req.body.startDate, $lt: req.body.endDate },
    });
    res.send(starttonow);
    // console.log(starttonow);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
