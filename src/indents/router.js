const { Router } = require("express");
const router = new Router();
const Indent = require("./model");

router.post("/indent", async (req, res, next) => {
  try {
    const saveIndent = await Indent.create(req.body);
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
