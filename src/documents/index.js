var moment = require("moment");

module.exports = (visit, patient) => {
  const visitmedicines = visit.medicinePrescribed;
  const medi = visit.medicinePrescribed.length === 0 ? "none" : "some medics";
  const toothvisit = visit.toothData;
  const tooth =
    toothvisit.length === 0
      ? "none"
      : toothvisit.map((item, index) => {
          const diagnosisText = item.diagnosis.join();
          const procedureText = item.procedures.join();
          return `Tooth: <i> ${item.toothNo} </i> was diagnosed with: <i> ${diagnosisText} </i> and <i> ${procedureText} </i> was identified as a result `;
        });
  console.log(visitmedicines, toothvisit, tooth, patient);

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Template for patient visit</title>
    <style>
      body {
        box-sizing: border-box;
        width: 153.5mm;
        height: 218mm;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        color: gray;
        border: solid gray 2px;
        padding: 7px;
      }
      #main{
        height: 68%;
      }
      .header,
      .footer {
        display: block;
        height: 15%;
        width: 100%;
        background-color: cornflowerblue;
      }
      .nameagedate {
        display: flex;
      }
      .nad {
        list-style: none;
        height: 20px;
      } 
    </style>
  </head>
  <body>
    <header class="header"> 
    <img src="https://i.pinimg.com/600x315/78/74/18/787418639fb5fbf2e6372c0e3ce62080.jpg" alt="brand logo  />
    </header>
    <br />
    <main id="main">
    <div>
      <div class="nameagedate">
        <div class="nad">Name: ${patient.name} </div>
        <div class="nad">Age/Sex: ${moment(new Date()).diff(
          moment(patient.dob),
          "years"
        )} Years /${patient.gender} </div>
        <div class="nad">Date: ${moment(visit.Visitdate).format(
          "DD MMMM, YYYY"
        )} </div>
      </div>
    </div>
    <hr />
    <div id="cc"><b>CHIEF COMPLAIN: </b>${visit.chiefComplaint} </div>
    <div id="oe"><b> ORAL EXAMINATION: </b>${visit.oralExamination}</div>
    <div id="investigation">
      <b> INVESTIGATION:</b> ${visit.investigation}
    </div>
    <div id="tt"><b> TREATMENT PLAN:</b> ${visit.treatmentPlan}</div>
    <div id="toothdata"><b> TOOTH DATA:</b> ${tooth} </div>
    <div id="medicine">
      <b> MEDICINE:</b> ${medi}      
    </div>

    <div id="advice"><b> ADVICE:</b> ${visit.advice} </div>
    <div id="fee"><b> PRESCRIPTION FEE:</b> ${visit.consultationCost} </div>
    </main>
    <footer class="footer"></footer>
  </body>
</html>

  `;
};

// _id: '5eb73a6705e19c04f62d428c',
//   Visitdate: '2020-05-09T23:14:26.745Z',
//   procedureEstimate: 1000,
//   paymentMode: 'Cash',
//   received: 500,
//   balance: 999999,
//   medicinePrescribed: [],
//   toothData: [
//     {
//       diagnosis: [Array],
//       procedures: [Array],
//       _id: '5eb73a6705e19c04f62d428d',
//       toothNo: '13',
//       treatmentPlan: 'we will see',
//       procedureCost: 1000,
//       toothimage: ''
//     }
//   ],
