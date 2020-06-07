const { Router } = require("express");
const router = new Router();
const Inventory = require("./inventory/model");
const Indent = require("./indents/model");
const Labwork = require("./labworks/model");
const PatientVisit = require("./patientvisit/model");
const Procedure = require("./procedures/model");

router.get("/finance", async (req, res, next) => {
  try {
    // const newDate = new Date("2021-01-01T00:00:00.000Z").getTime();
    // console.log(new Date(newDate + 3600000 * 24 * 10));
    // const inventoryList = await Inventory.find({
    //   inUseExpiry: { $gte: new Date("2021-01-01") },
    // })
    //   .sort({ inUseExpiry: -1 })
    //   .limit(10);

    // the paid Indent orders ONLY
    const IndentList = await Indent.find({
      orderDate: { $lte: new Date("2021-01-01") },
      paid: { $gt: 0 },
    }).sort({ inUseExpiry: -1 });

    // lab works found according to delivery date
    const LabWorkList = await Labwork.find({
      deliveryDate: { $lte: new Date("2021-01-01") },
      status: true,
    }).sort({ deliveryDate: -1 });

    // patient consultations based on Visitdate
    const ConsultationList = await PatientVisit.find({
      Visitdate: { $lte: new Date("2021-01-01") },
    });

    const PatientProcedurePayment = await Procedure.find({
      procedureDate: {
        $gt: new Date("2020-05-01"),
        $lte: new Date("2020-05-20"),
      },
    });

    res.send(PatientProcedurePayment);
    //
  } catch {
    (error) => console.error(error);
  }
});

module.exports = router;
