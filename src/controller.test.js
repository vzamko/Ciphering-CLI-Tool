const controller = require("./controller");
const validator = require("./utils/validator");
const getValues = require("./utils/getValues");
const fs = require("fs");
const settings = require("../settings");

jest.mock("./utils/validator");
const mockGetValue = jest.spyOn(getValues, "getValue");
const mockGetConfig = jest.spyOn(getValues, "getConfig");

beforeEach(() => {
  fs.writeFile(
    settings.PROJECT_DIR + "/input.txt",
    'This is secret. Message about "_" symbol!',
    (e) => {
      if (e) {
        throw e;
      }
    }
  );

  fs.writeFile(settings.PROJECT_DIR + "/output.txt", "", (e) => {
    if (e) {
      throw e;
    }
  });
});

beforeAll(() => {
  process.argv.push(
    "-c",
    "C1-C0-A-R1-R0-A-R0-R0-C1-A",
    "-i",
    settings.PROJECT_DIR + "/input.txt",
    "-o",
    settings.PROJECT_DIR + "/output.txt"
  );
});

describe("Controller run function:", () => {
  test("must be definite", () => {
    expect(controller.run).toBeDefined();
  });

  test("must pass with short flags", () => {
    controller.run();

    expect(validator.checkArgs).toHaveBeenCalled();
    expect(validator.checkConfig).toHaveBeenCalled();
    expect(validator.checkFile).toHaveBeenCalled();
    expect(mockGetValue).toHaveBeenCalled();
    expect(mockGetConfig).toHaveBeenCalled();
  });

  test("must pass with long flags", () => {
    process.argv[process.argv.indexOf('-c')] = '--config';
    process.argv[process.argv.indexOf('-i')] = '--input';
    process.argv[process.argv.indexOf('-o')] = '--output';

    controller.run();

    expect(validator.checkArgs).toHaveBeenCalled();
    expect(validator.checkConfig).toHaveBeenCalled();
    expect(validator.checkFile).toHaveBeenCalled();
    expect(mockGetValue).toHaveBeenCalled();
    expect(mockGetConfig).toHaveBeenCalled();
  });
});
