const express = require("express");

const webpush = require("web-push");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
// app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
const publicKey =
  "BLAwMC3fJ0a1EpGPXDaF6b0UiCqWbg87ZT8V5Qt8dnh32_hmND15uAWaLb1DL5tAgLNAEMMEopfE_xL5-Js3h4s";
const privateKey = "Im3xSYVyl8mNih915eUyS-QVh0C2XYusqPjJTOgYTHM";

webpush.setVapidDetails(
  "mailto:pradeepsaridha@gmail.com",
  publicKey,
  privateKey
);

// Subscribe
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  //201 success

  const payload = JSON.stringify({
    title: "Push test from the server",
  });
  res.status(201).json({ payload });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.listen(5000, () => {
  console.log("Server Running on port 5000");
});
