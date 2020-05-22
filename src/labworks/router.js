const { Router } = require("express");
const router = new Router();
const Labwork = require("./model");

router.get("/labwork", async (req, res, next) => {
  try {
    const labworkList = await Labwork.find();
    // console.log(labworkList);
    res.send(labworkList);
  } catch {
    (error) => console.error(error);
  }
});

router.post("/labwork", async (req, res, next) => {
  try {
    const createLabwork = await Labwork.create({
      labName: req.body.labName,
      workType: req.body.workType,
      collectionDate: req.body.collectionDate,
      deliveryDate: req.body.deliveryDate,
      itemSent: req.body.itemSent,
      itemReceived: req.body.itemReceived,
      note: req.body.note,
      price: req.body.price,
    });
    res.send({
      message: "The record was created successfully!",
      data: createLabwork,
    });
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
