/*
 Designed and developed by Hoang Bao Ngo
*/

const express = require("express");
const app = express();
const apiRoutes = require("./routing/api");

// Send the whole build folder to the user or anyone connected to the server
app.use(express.static(path.join(__dirname, "../client/www")));
app.use(express.static(path.join(__dirname, "../server/public")));
app.use(express.json({ limit: "25mb", extended: true }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use("/api", apiRoutes);

// Create server
const http = require("http");
http.createServer(app).listen(8000, () => {
  console.log("Your server is listening at localhost:8000");
});