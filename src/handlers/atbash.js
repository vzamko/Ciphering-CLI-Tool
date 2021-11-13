const stream = require("stream");
const mappingHandler = require("./utils/mappingHandler");

const mapping = {
  a: "z",
  b: "y",
  c: "x",
  d: "w",
  e: "v",
  f: "u",
  g: "t",
  h: "s",
  i: "r",
  j: "q",
  k: "p",
  l: "o",
  m: "n",
  n: "m",
  o: "l",
  p: "k",
  q: "j",
  r: "i",
  s: "h",
  t: "g",
  u: "f",
  v: "e",
  w: "d",
  x: "c",
  y: "b",
  z: "a",
};

module.exports = class Atbash extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    });
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== "utf8") {
      this.emit("error", new Error("Source must be UTF-8."));
      return callback();
    }

    this.push(mappingHandler.run(chunk, mapping));
    callback();
  }
};
