const fs = require("fs");
const validator = require("./utils/validator");
const getValues = require("./utils/getValues");
const transformRunner = require("./utils/transformRunner");

module.exports.run = () => {
  const argv = process.argv.slice(2);

  validator.checkArgs(argv);

  let inputFile;
  let outputFile;

  if (argv.indexOf("-i") >= 0) {
    inputFile = getValues.getValue("-i");
  }

  if (argv.indexOf("--input") >= 0) {
    inputFile = getValues.getValue("--input");
  }

  if (inputFile) {
    validator.checkFile(inputFile);
  }

  if (argv.indexOf("-o") >= 0) {
    outputFile = getValues.getValue("-o");
  }

  if (argv.indexOf("--output") >= 0) {
    outputFile = getValues.getValue("--output");
  }

  if (outputFile) {
    validator.checkFile(outputFile);
  }

  let config = getValues.getConfig(argv);
  validator.checkConfig(config);
  let configs = config.split("-");

  if (inputFile && outputFile) {
    let stream = fs.createReadStream(inputFile, "utf8");
    stream = transformRunner.transform(stream, configs);
    stream.pipe(fs.createWriteStream(outputFile, { flags: "a" }));
  } else if (inputFile && !outputFile) {
    let stream = fs.createReadStream(inputFile, "utf8");
    stream = transformRunner.transform(stream, configs);
    stream.pipe(process.stdout);
  } else if (!inputFile && outputFile) {
    let stream = process.stdin.setEncoding("utf8");
    stream = transformRunner.transform(stream, configs);
    stream.pipe(fs.createWriteStream(outputFile, { flags: "a" }));
  } else {
    let stream = process.stdin.setEncoding("utf8");
    stream = transformRunner.transform(stream, configs);
    stream.pipe(process.stdout);
  }
};
