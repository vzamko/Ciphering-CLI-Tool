const stream = require("stream");
const mappingHandler = require("./utils/mappingHandler");

const mapping = {
  a: "i",
  b: "j",
  c: "k",
  d: "l",
  e: "m",
  f: "n",
  g: "o",
  h: "p",
  i: "q",
  j: "r",
  k: "s",
  l: "t",
  m: "u",
  n: "v",
  o: "w",
  p: "x",
  q: "y",
  r: "z",
  s: "a",
  t: "b",
  u: "c",
  v: "d",
  w: "e",
  x: "f",
  y: "g",
  z: "h",
};

module.exports = class Rot8 extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    });
    super(options);

    this.decoding = options.decoding;
  }

  _transform(chunk, encoding, callback) {
    if (this.checkError(encoding)) {
      this.emit("error", new Error("Source must be UTF-8."));
      return callback();
    }

    if (this.decoding) {
      let reverseMapping = this.getReverseMapping();
      this.push(mappingHandler.run(chunk, reverseMapping));
      callback();
    } else {
      this.push(mappingHandler.run(chunk, mapping));
      callback();
    }
  }

  getReverseMapping = () => {
    const reverseMapping = {};

    Object.keys(mapping).forEach((item) => {
      let key = mapping[item];
      reverseMapping[key] = item;
    });

    return reverseMapping;
  };

  checkError = (encoding) => {
    return encoding !== "utf8";
  };
};
