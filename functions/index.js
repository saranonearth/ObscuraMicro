const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const express = require("express");

const app = express();
app.use(cors);
admin.initializeApp(functions.config().firebase);

app.get("/hello", (req, res) => {
  res.json({
    msg: "hello"
  });
});

exports.app = functions.https.onRequest(app);
