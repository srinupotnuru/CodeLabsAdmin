const express = require("express");
const app = express();
const bp = require("body-parser");
require("dotenv").config();
const axios = require("axios");
app.use(express.static("./"));
app.use(bp.json());

app.post("/evaluate", (req, res) => {
  console.log(req.body);
  let executable = {
    script: req.body.program,
    language: req.body.lan,
    stdin:req.body.stdin,
    versionIndex: "0",
    clientId: process.env.clientID,
    clientSecret: process.env.clientSecret,

  };

  axios
    .post("https://api.jdoodle.com/v1/execute", executable)
    .then((r) => res.send(r.data.output))
    .catch((err) =>
      res.send(
        "Please Contact Administrator to resolve Backend Issues. " +
          err.toString()
      )
    );
});

app.listen(8080, () => console.log("Running."));
