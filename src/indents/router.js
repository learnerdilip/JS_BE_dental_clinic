const { Router } = require("express");
const router = new Router();
const Indent = require("./model");

router.post("/indent", async (req, res, next) => {
  try {
    console.log("indents request:", req.body);
    const saveIndent = await Indent.create(req.body);
    // console.log(saveIndent);
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
