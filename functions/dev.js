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

app.get("/getlevel/:id", (req,res) => {
    const id = req.params.id;
    let user;
    let levels;
    const today = format(new Date(),'MM/dd/yyyy');
    const levelRef = db.ref("/levels/");
    const userRef = db.ref(`/users/${id}`)
    userRef.once("value")
            .then(snap => {
                user = snap.val();
                levelRef.once("value")
                        .then(snap => {
                            levels = [...snap.val()];
                            levels.shift();
                            if(user.levelsSolved) {
                                let levelObject = [...user.levelsSolved];
                                const currentLevel = user.levelsSolved.find(e => e.day.toString() === today.toString());
                                if(currentLevel) {
                                    if(currentLevel.solved === 0) {
                                        const level = levels.find(e => e.name === "level 1");
                                        return res.json({
                                            message: 'FOUND',
                                            data: level
                                        });
                                    } else if (currentLevel.solved === 1) {
                                        const level = levels.find(e => e.name === "level 2");
                                        return res.json({
                                            message: 'FOUND',
                                            data: level
                                        });
                                    }
                                    else {
                                        return res.json({
                                            message: 'GAME_OVER'
                                        });
                                    }
                                } else {
                                    const newLevel = {
                                        day: today,
                                        solved: 0
                                    };
                                    levelObject.push(newLevel);
                                    userRef.update({
                                        ...user,
                                        levelsSolved: [...levelObject]
                                    });
                                    const level = levels.find(e => e.name === "level 1");
                                    return res.json({
                                        message: 'FOUND',
                                        data: level
                                    });
                                }   
                            } else {
                                userRef.update({
                                    ...user,
                                    levelsSolved: [{
                                        day: today,
                                        solved: 0
                                    }]
                                });
                                const level = levels.find(e => e.name === "level 1");
                                return res.json({
                                    message: 'FOUND',
                                    data: level
                                });
                            } 
                        });
            });
});

app.post("/check",(req,res) => {
    const now = format(new Date(),'MM/dd/yyyy');
    let user;
    const {answer, id} = req.body;
    const userRef =  db.ref(`/users/${id}`);
    userRef.once("value")
            .then(snap => {
                user = snap.val();
                const userObject = user.levelsSolved.find(e => e.day.toString() === now.toString());
                if(userObject.solved === 2) {
                    return res.json({
                        message:'GAME_OVER'
                    });
                } else {
                    const levelRef = db.ref(`/levels/${userObject.solved + 1}`);
                    levelRef.once("value")
                            .then(snap => {
                                const level = {...snap.val()};
                                const isLate = compareAsc(new Date(now),new Date(level.endTime));
                                if(isLate === 1) {
                                    return res.json({
                                        message: 'LATE'
                                    });
                                } else {
                                    if(level.answer === answer) {
                                        let levels = [...user.levelsSolved];
                                        const updatedLevel = {
                                            day: now,
                                            solved: userObject.solved + 1
                                        };
                                        levels.pop();
                                        levels.push(updatedLevel);
                                        userRef.update({
                                            ...user,
                                            levelsSolved: [...levels],
                                        });
                                        return res.json({
                                            message: 'CORRECT'
                                        });
                                    } else {
                                        return res.json({
                                            message: 'WRONG'
                                        });
                                    }
                                }
                            });
                }

            });
});

app.listen(5050, () => {
    console.log("ON PORT 5050");
});