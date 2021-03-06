/*
 Designed and developed by Hoang Bao Ngo
*/

require('dotenv').config()  // Use .env file
const express = require("express");
const app = express();
const apiRoutes = require("./routing/api");
const path = require("path");
const database = require("./services/database");
database.connect("SIT");
// Send the whole build folder to the user or anyone connected to the server
app.use(express.static(path.join(__dirname, "../dist")));

// middleware to populate request.body, parsing application/json
app.use(express.json({ limit: "1mb", extended: true }));

// API Routes
app.use("/api", apiRoutes);

// Create server
const http = require("http");
http.createServer(app).listen(8000, () => {
  console.log("Your server is listening at localhost:8000");
});
