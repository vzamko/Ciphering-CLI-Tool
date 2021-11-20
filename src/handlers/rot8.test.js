const { Readable, Transform } = require("stream");
const fs = require("fs");
const settings = require("../../settings");
const Rot8 = require("../handlers/rot8");

let mockReadable;

const reverseMapping = {
  i: "a",
  j: "b",
  k: "c",
  l: "d",
  m: "e",
  n: "f",
  o: "g",
  p: "h",
  q: "i",
  r: "j",
  s: "k",
  t: "l",
  u: "m",
  v: "n",
  w: "o",
  x: "p",
  y: "q",
  z: "r",
  a: "s",
  b: "t",
  c: "u",
  d: "v",
  e: "w",
  f: "x",
  g: "y",
  h: "z",
};

beforeEach(() => {
  mockReadable = Readable.from(['This is secret. Message about "_" symbol!']);

  fs.writeFile(
    settings.PROJECT_DIR + "/input.txt",
    'This is secret. Message about "_" symbol!',
    (e) => {
      if (e) {
        throw e;
      }
    }
  );
});

describe("Rot8 transform:", () => {
  test("reverseMapping function", () => {
    let rot8 = new Rot8({ decoding: false });

    expect(rot8.getReverseMapping()).toEqual(reverseMapping);
  });

  test("checkError function", () => {
    let rot8 = new Rot8({ decoding: false });

    expect(rot8.checkError("utf8")).toBeFalsy();
    expect(rot8.checkError("ascii")).toBeTruthy();
  });

  test("_transform function must pass without error", () => {
    let rot8 = new Rot8({ decoding: false });
    const mockTransform = jest.spyOn(rot8, "_transform");
    rot8._transform(
      'This is secret. Message about "_" symbol!',
      "utf8",
      () => {}
    );

    expect(mockTransform).toHaveBeenCalled();
  });

  test("_transform function must pass without error", () => {
    let rot8 = new Rot8({ decoding: true });
    const mockTransform = jest.spyOn(rot8, "_transform");
    rot8._transform("I love potato", "utf8", () => {});

    expect(mockTransform).toHaveBeenCalled();
  });

  test("must transform text", () => {
    let rot8 = new Rot8({ decoding: false });
    rot8 = mockReadable.pipe(rot8).setEncoding("utf8");

    rot8.on("data", (chunk) => {
      expect(chunk).toBe('Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!\n');
    });
  });

  test("must transform text", () => {
    let rot8 = new Rot8({ decoding: true });
    rot8 = mockReadable.pipe(rot8).setEncoding("utf8");

    rot8.on("data", (chunk) => {
      expect(chunk).toBe('Lzak ak kwujwl. Ewkksyw stgml "_" kqetgd!\n');
    });
  });

  test("must call Error", () => {
    let mockReadableWithoutUtf8 = fs.createReadStream("input.txt");
    let rot8 = new Rot8();
    rot8 = mockReadableWithoutUtf8.pipe(rot8);

    rot8.on("error", (e) => {
      expect(e.message).toBe("Source must be UTF-8.");
    });
  });
});
