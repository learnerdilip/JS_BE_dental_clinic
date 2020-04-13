const { Router } = require("express");
const router = new Router();

const Patient = require("./model");

router.post("/patient", async (req, res, next) => {
  try {
    const createpatient = await Patient.create({
      name: req.body.name,
    });
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
