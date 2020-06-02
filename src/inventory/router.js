const { Router } = require("express");
const router = new Router();
const Inventory = require("./model");

router.get("/inventory", async (req, res, next) => {
  try {
    const inventoryList = await Inventory.find();
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
    //
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
