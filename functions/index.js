const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true
});
const express = require("express");

const app = express();
app.use(cors);
admin.initializeApp(functions.config().firebase);

app.get("/", (req, res) => {
  res.json({
    message: "Working"
  });
});

app.post("/check", (req, res) => {
  const { answer, time } = req.body;
  console.log(answer, time);
  const nowTime = new Date();
  const hourC = nowTime.getHours();
  const hourR = time.getHours();
  const minC = nowTime.getMinutes();
  const minR = time.getMinutes();
  console.log(nowTime);
  console.log(hourC, hourR);
  console.log(minC, minR);
  try {
    if (hourC - hourR > 0 && minC - minR < 60) {
      console.log("here");
      if (answer === "saran") {
        res.json({
          code: "CORRECT",
          message: "Correct Answer",
          data: {
            level: 2,
            data: "LINK"
          }
        });
      } else {
        res.json({
          code: "WRONG",
          message: "Wrong Answer"
        });
      }
    } else {
      res.json({
        code: "DELAY",
        message: "Time is up for this question."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

exports.app = functions.https.onRequest(app);
