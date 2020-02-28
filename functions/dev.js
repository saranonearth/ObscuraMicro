const functions = require("firebase-functions");
const admin = require("firebase-admin");
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

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(cors);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://obscuramini-967ea.firebaseio.com"
});
const db = admin.database();

//@Functions

app.get("/", (req, res) => {
    res.json({
        message: "Working"
    });
});



app.get("/getlevel/:id", (req, res) => {
    const today = format(new Date(), 'MM/dd/yyyy')
    const id = req.params.id;
    let user;
    let levels;
    //getLevels

    //get user
    db.ref(`/users/${id}`)
        .once("value").then(res => {
            user = res.val();
            console.log('USER', user)
            db.ref("/levels/")
                .once("value")
                .then(res => {
                    levels = res.val()
                    console.log("LEVLES", levels.shift())
                    levels.shift()
                    if (user.levelsSolved) {
                        const levelObj = user.levelsSolved.find(e => e.day.toString() === today.toString());

                        if (levelObj.solved === 0) {
                            const level = levels.find(e => e.name === "level 1")

                            return res.json({
                                message: 'FOUND',
                                data: level
                            })
                        }

                        if (levelObj.solved === 1) {
                            const level = levels.find(e => e.name === "level 2")

                            return res.json({
                                message: 'FOUND',
                                data: level
                            })
                        }


                        if (levelObj.solved === 2) {
                            return res.json({
                                message: 'GAME_OVER'
                            })
                        }
                    } else {
                        //if no level for current day object is found

                        db.ref(`/users/${id}`).update({
                            ...user,
                            levelsSolved: [{
                                day: format(new Date(), 'MM/dd/yyyy'),
                                solved: 0
                            }]
                        })

                        const level = levels.find(e => e.name === "level 1")

                        return res.json({
                            message: 'FOUND',
                            data: level
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        })

    //get user accessable level


    //send user accessable level



    return res.json({
        message: "got it "
    })
})



app.post("/check", (req, res) => {
    const endTime = "Wed Feb 26 2020 12:30:29 GMT+0530 (India Standard Time)";
    const now = new Date();
    const {
        answer
    } = req.body;
    console.log(answer);

    db.ref("/levels/")
        .once("value")
        .then(res => {
            console.log(res.val());
        })
        .catch(err => {
            console.log(err);
        });

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