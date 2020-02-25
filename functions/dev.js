const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {
    format,
    compareAsc
} = require("date-fns");
const cors = require("cors")({
    origin: true
});


var serviceAccount = require("./key.json");


var bodyParser = require("body-parser");

const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://obscuramini-967ea.firebaseio.com"
});

app.get("/", (req, res) => {
    res.json({
        message: "Working"
    });
});



app.post("/check", (req, res) => {
    const endTime = "Mon Feb 24 2020 23:50:35 GMT+0530 (India Standard Time)";
    const now = new Date();
    const {
        answer
    } = req.body;
    console.log(answer);

    const db = admin.database()

    db.ref("/levels/").once("value").then(res => {
        console.log(res.val())
    }).catch(err => {
        console.log(err)
    })

    var isLate = compareAsc(new Date(now), new Date(endTime));
    console.log(isLate);
    if (isLate === 1) {
        return res.json({
            message: "LATE"
        });
    } else {
        if (answer === "saran") {
            return res.json({
                message: "CORRECT"
            });
        } else {
            return res.json({
                message: "WRONG"
            });
        }
    }
});

app.listen(5050, () => {
    console.log("ON PORT 5050");
});