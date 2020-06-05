const { Router } = require("express");
const router = new Router();
const Indent = require("./model");

router.post("/indent", async (req, res, next) => {
  try {
    // console.log("indents request:", req.body);
    const saveIndent = await Indent.create(req.body);
    // console.log(saveIndent);
    res.send(saveIndent);
  } catch {
    (error) => console.error(error);
  }
});

router.get("/indent", async (req, res, next) => {
  try {
    const indentList = await Indent.find().limit(10);
    // console.log("***********", indentList);
    res.send(indentList);
  } catch {
    (error) => {
      return console.error(error);
    };
  }
});

router.patch("/indent", async (req, res, next) => {
  try {
    console.log(req.body);
    const updateIndent = await Indent.update({ _id: req.body._id }, req.body);
    // console.log(updateIndent);
  } catch {
    (error) => {
      return console.error(error);
    };
  }
});

module.exports = router;
