const mongoose = require("mongoose");
const log = require("../logger");
const chalk = require("chalk");

// require database URL from properties file
const dbURL = require("./properties").DB; // should be full Mongo URI

// chalk styles
const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;

module.exports = function () {
  mongoose
    .connect(dbURL)
    .then(() => {
      log.info(connected(`✅ Mongoose connected to: ${dbURL}`));
      console.log("db url:", dbURL);
    })
    .catch((err) => {
      log.error(error(`❌ Mongoose connection error: ${err.message}`));
    });

  mongoose.connection.on("disconnected", function () {
    log.warn(disconnected("⚠️ Mongoose connection disconnected"));
  });

  process.on("SIGINT", async function () {
    try {
      await mongoose.connection.close();
      log.info(
        termination(
          "🔌 Mongoose connection is closed due to app termination"
        )
      );
    } catch (err) {
      log.error(error(`Error closing connection: ${err.message}`));
    }
    process.exit(0);
  });
};
