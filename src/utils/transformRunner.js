const Ceasar = require("../handlers/ceasar");
const Rot8 = require("../handlers/rot8");
const Atbash = require("../handlers/atbash");
const errorHandler = require("../utils/errorHandler");

module.exports.transform = (stream, configs) => {
  configs.forEach((config) => {
    switch (config) {
      case "C1":
        stream = stream
          .pipe(new Ceasar({ decoding: false }))
          .setEncoding("utf8");

        break;

      case "C0":
        stream = stream
          .pipe(new Ceasar({ decoding: true }))
          .setEncoding("utf8");

        break;

      case "A":
        stream = stream.pipe(new Atbash()).setEncoding("utf8");

        break;

      case "R1":
        stream = stream.pipe(new Rot8({ decoding: false })).setEncoding("utf8");

        break;

      case "R0":
        stream = stream.pipe(new Rot8({ decoding: true })).setEncoding("utf8");

        break;

      default:
        errorHandler.error("Unknown configuration.", "Syntax error.");
    }
  });

  return stream;
};
