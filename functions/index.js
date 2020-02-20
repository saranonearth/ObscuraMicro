const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
    origin: true
});
const express = require("express");

const app = express();
app.use(cors);
admin.initializeApp(functions.config().firebase);

app.post("/check", (req, res) => {
    const {
        answer,
        time
    } = req.body

    const nowTime = new Date();
    const hourC = nowTime.getHours()
    const hourR = time.getHours()
    const minC = nowTime.getMinutes();
    const minR = time.getMinutes();

    try {
        if (hourC - hourR > 0 && minC - minR < 60) {
            if (answer === "saran") {
                res.json({
                    code: "CORRECT",
                    message: "Correct Answer",
                    data: {
                        level: 2,
                        data: 'LINK'
                    }
                })
            } else {
                res.json({
                    code: "WRONG",
                    message: "Wrong Answer"
                })
            }
        } else {
            res.json({
                code: "DELAY",
                message: "Time is up for this question."
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
});

exports.app = functions.https.onRequest(app);