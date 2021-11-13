const fs = require("fs");
const errorHandler = require("./errorHandler");

module.exports.checkArgs = (argv) => {
  if (argv.indexOf("-c") < 0 && argv.indexOf("--config") < 0) {
    errorHandler.error(
      'Config flag is missed. Please enter "-c" or "--config".',
      "Syntax error."
    );
  }

  if (
    argv.indexOf("-c") !== argv.lastIndexOf("-c") ||
    argv.indexOf("--config") !== argv.lastIndexOf("--config")
  ) {
    errorHandler.error("Duplicated configuration.", "Duplicate arguments.");
  }

  if (argv.indexOf("-c") >= 0 && argv.indexOf("--config") >= 0) {
    errorHandler.error("Duplicated configuration.", "Duplicate arguments.");
  }

  if (
    argv.indexOf("-i") !== argv.lastIndexOf("-i") ||
    argv.indexOf("--input") !== argv.lastIndexOf("--input")
  ) {
    errorHandler.error("Duplicated inputs.", "Duplicate arguments.");
  }

  if (argv.indexOf("-i") >= 0 && argv.indexOf("--input") >= 0) {
    errorHandler.error("Duplicated inputs.", "Duplicate arguments.");
  }

  if (
    argv.indexOf("-o") !== argv.lastIndexOf("-o") ||
    argv.indexOf("--output") !== argv.lastIndexOf("--output")
  ) {
    errorHandler.error("Duplicated outputs.", "Duplicate arguments.");
  }

  if (argv.indexOf("-o") >= 0 && argv.indexOf("--output") >= 0) {
    errorHandler.error("Duplicated outputs.", "Duplicate arguments.");
  }
};

module.exports.checkFile = (file) => {
  if (!fs.existsSync(file)) {
    errorHandler.error(file + " file is not exit.", "File error.");
  }
};

module.exports.checkConfig = (config) => {
  if (!config.match(/^[\d\w].*[\d\w]$/)) {
    errorHandler.error("Not valid configuration syntax.", "Syntax error.");
  }

  const ciphers = ["A", "C0", "C1", "R0", "R1"];

  config.split("-").forEach((item) => {
    if (!ciphers.includes(item)) {
      errorHandler.error(
        item + " is not valid configuration.",
        "Syntax error."
      );
    }
  });
};
