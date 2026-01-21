var express = require("express");
const log = require("./logger");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const environment = process.env.NODE_ENV || "development";
dotenv.config({
  path: path.join(__dirname, `./config/environment/.env.${environment}`),
});
var properties = require("./config/properties");
var db = require("./config/database");
//hero routes
var router = express.Router();

var loginRoutes = require("./api/login.route");
var companyRoutes = require("./api/company.route");
var userRoutes = require("./api/user.route");
var applicationsRoutes = require("./api/applications.route");
var interviewsRoutes = require("./api/interviews.route");
var jobsRoutes = require("./api/jobs.route");
var enquiryRoutes = require("./api/enquiry.route");
var studentRoutes = require("./api/studentRoutes");
// var quickStatRoutes = require("./api/quickStat.route");
// var kpiRoutes = require("./api/kpi.route");

var app = express();

//configure bodyparser
app.set("views", "./views");
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// call the database connectivity function
db();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
);

// CORS Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,DELETE,PUT,PATCH",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization",
  );
  next();
});

// Root route - serve dashboard
app.get("/", (req, res) => {
  res.send("Welcome to Mentra API");
});

// API routes
app.use("/v1/Mentra", router);
loginRoutes(router);
companyRoutes(router);
userRoutes(router);
studentRoutes(router);
applicationsRoutes(router);
interviewsRoutes(router);
jobsRoutes(router);
enquiryRoutes(router);
app.use("/v1/Mentra/students", studentRoutes);
// quickStatRoutes(router);
// kpiRoutes(router);

// Server is initialized in bin/www.js
module.exports = app;
