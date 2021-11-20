const Ceasar = require("../handlers/ceasar");
const { Readable } = require("stream");
const fs = require("fs");
const settings = require("../../settings");

let mockReadable;

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

describe("Ceasar transform:", () => {
  test("must transform text", () => {
    let ceasar = new Ceasar({ decoding: false });
    ceasar = mockReadable.pipe(ceasar).setEncoding("utf8");

    ceasar.on("data", (chunk) => {
      expect(chunk).toBe('Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!\n');
    });
  });

  test("must transform text", () => {
    let ceasar = new Ceasar({ decoding: true });
    ceasar = mockReadable.pipe(ceasar).setEncoding("utf8");

    ceasar.on("data", (chunk) => {
      expect(chunk).toBe('Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!\n');
    });
  });

  test("_transform function must pass without error", () => {
    let ceasar = new Ceasar({ decoding: false });
    const mockTransform = jest.spyOn(ceasar, "_transform");
    ceasar._transform(
      'This is secret. Message about "_" symbol!',
      "utf8",
      () => {}
    );

    expect(mockTransform).toHaveBeenCalled();
  });

  test("_transform function must pass without error", () => {
    let ceasar = new Ceasar({ decoding: true });
    const mockTransform = jest.spyOn(ceasar, "_transform");
    ceasar._transform(
      'This is secret. Message about "_" symbol!',
      "utf8",
      () => {}
    );

    expect(mockTransform).toHaveBeenCalled();
  });

  test("must call Error", () => {
    let mockReadableWithoutUtf8 = fs.createReadStream("input.txt");
    let ceasar = new Ceasar();
    ceasar = mockReadableWithoutUtf8.pipe(ceasar);

    ceasar.on("error", (e) => {
      expect(e.message).toBe("Source must be UTF-8.");
    });
  });
});
