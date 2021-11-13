const stream = require("stream");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

module.exports = class Ceasar extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    });
    super(options);

    this.decoding = options.decoding;
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== "utf8") {
      this.emit("error", new Error("Source must be UTF-8."));
      return callback();
    }

    let valueArr = chunk.split("");

    valueArr.forEach((item, index) => {
      let isUpperCase = item.toUpperCase() === item;
      let newItem;

      if (this.decoding) {
        if (alphabet.indexOf(item.toLowerCase()) < 0) {
          newItem = item;
        } else if (alphabet.indexOf(item.toLowerCase()) === 0) {
          newItem = alphabet[alphabet.length - 1];
        } else {
          newItem = alphabet[alphabet.indexOf(item.toLowerCase()) - 1];
        }
      } else {
        if (alphabet.indexOf(item.toLowerCase()) < 0) {
          newItem = item;
        } else if (
          alphabet.indexOf(item.toLowerCase()) ===
          alphabet.length - 1
        ) {
          newItem = alphabet[0];
        } else {
          newItem = alphabet[alphabet.indexOf(item.toLowerCase()) + 1];
        }
      }

      if (isUpperCase) {
        newItem = newItem.toUpperCase();
      }

      valueArr[index] = newItem;
    });

    this.push(
      valueArr.join("").slice(-1) === "\n"
        ? valueArr.join("")
        : valueArr.join("") + "\n"
    );
    callback();
  }
};
