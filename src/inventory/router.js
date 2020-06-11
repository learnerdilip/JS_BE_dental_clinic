const { Router } = require("express");
const router = new Router();
const Inventory = require("./model");

router.get("/inventory", async (req, res, next) => {
  try {
    const newDate = new Date("2021-01-01T00:00:00.000Z").getTime();
    // console.log(new Date(newDate + 3600000 * 24 * 10));

    const inventoryList = await Inventory.find();
    //   inUseExpiry: new Date("2021-01-01"),
    // })
    //   .sort({ inUseExpiry: -1 })
    //   .limit(10);
    res.send(inventoryList);
  } catch {
    (error) => console.error(error);
  }
});

router.post("/inventory", async (req, res, next) => {
  try {
    const newInventory = await Inventory.create(req.body);
    // console.log(newInventory);
    res.send(newInventory);
  } catch {
    (error) => console.error(error);
  }
});

router.patch("/inventory", async (req, res, next) => {
  try {
    // console.log("-----the reqest body for Inv update----", req.body);
    const updateInvenory = await Inventory.update(
      { _id: req.body._id },
      req.body
    );
    const inventoryList = await Inventory.find();
    res.send(inventoryList);
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
