const validator = require("./validator");
const errorHandler = require("./errorHandler");

const mockErrorHandler = jest.spyOn(errorHandler, "error");
const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
const mockError = jest.spyOn(console, "error").mockImplementation(() => {});

let argv;
let argvWithoutConfig;
let argvDuplicateConfig;
let argvWrongInputFileConfig;
let argvWrongOutputFileConfig;
let argvWrongConfig;
let argvDuplicateInputConfig;
let argvDuplicateInputDiffConfig;
let argvDuplicateOutputConfig;
let argvDuplicateOutputDiffConfig;

beforeAll(() => {
  argv = ["-c", "C1", "-i", "input.txt", "-o", "output.txt"];
  argvWithoutConfig = ["C1", "-i", "input.txt", "-o", "output.txt"];
  argvDuplicateConfig = [
    "-c",
    "C1",
    "-i",
    "input.txt",
    "-o",
    "output.txt",
    "--config",
  ];
  argvWrongInputFileConfig = [
    "-c",
    "C1",
    "-i",
    "wrong_input.txt",
    "-o",
    "output.txt",
  ];
  argvWrongOutputFileConfig = [
    "-c",
    "C1",
    "-i",
    "input.txt",
    "-o",
    "wrong_output.txt",
  ];
  argvWrongConfig = ["-c", "C2", "-i", "input.txt", "-o", "output.txt"];
  argvDuplicateInputConfig = ["-i", "input.txt", "-i", "input.txt", "-c", "C1"];
  argvDuplicateInputDiffConfig = [
    "-i",
    "input.txt",
    "--input",
    "input.txt",
    "-c",
    "C1",
  ];
  argvDuplicateOutputConfig = [
    "-o",
    "output.txt",
    "-o",
    "output.txt",
    "-c",
    "C1",
  ];
  argvDuplicateOutputDiffConfig = [
    "-o",
    "output.txt",
    "--output",
    "output.txt",
    "-c",
    "C1",
  ];
});

beforeEach(() => {
  mockErrorHandler.mockClear();
  mockExit.mockClear();
  mockError.mockClear();
});

describe("Validator checkArgs function:", () => {
  test("must be define", () => {
    expect(validator.checkArgs).toBeDefined();
  });

  test("must call duplicate config error", () => {
    validator.checkArgs("-c -c");

    expect(mockErrorHandler).toHaveBeenCalledTimes(1);
    expect(mockErrorHandler).toHaveBeenCalled();
  });

  test("checkArgs must call missing config error", () => {
    validator.checkArgs(argvWithoutConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: 'Config flag is missed. Please enter "-c" or "--config".',
      name: "Syntax error.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("checkArgs must call duplicate config error", () => {
    validator.checkArgs(argvDuplicateConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: "Duplicated configuration.",
      name: "Duplicate arguments.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("checkArgs must call duplicate inputs error", () => {
    validator.checkArgs(argvDuplicateInputConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: "Duplicated inputs.",
      name: "Duplicate arguments.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("checkArgs must call duplicate inputs error", () => {
    validator.checkArgs(argvDuplicateInputDiffConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: "Duplicated inputs.",
      name: "Duplicate arguments.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("checkArgs must call duplicate output error", () => {
    validator.checkArgs(argvDuplicateOutputConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: "Duplicated outputs.",
      name: "Duplicate arguments.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("checkArgs must call duplicate output error", () => {
    validator.checkArgs(argvDuplicateOutputDiffConfig);

    expect(mockError).toHaveBeenCalledWith({
      message: "Duplicated outputs.",
      name: "Duplicate arguments.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

describe("Validator checkFile function:", () => {
  test("must call error", () => {
    const filename = "_jest_test_file.txt";
    validator.checkFile(filename);

    expect(mockErrorHandler).toHaveBeenCalled();
    expect(mockError).toHaveBeenCalledWith({
      message: filename + " file is not exit.",
      name: "File error.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

describe("Validator checkConfig function:", () => {
  test("must call not valid syntax error", () => {
    const config = "-A-C1-C0";
    validator.checkConfig(config);

    expect(mockErrorHandler).toHaveBeenCalled();
    expect(mockError).toHaveBeenCalledWith({
      message: "Not valid configuration syntax.",
      name: "Syntax error.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("must call not valid item syntax error", () => {
    const config = "C1-A2-C0";
    validator.checkConfig(config);

    expect(mockErrorHandler).toHaveBeenCalled();
    expect(mockError).toHaveBeenCalledWith({
      message: "A2 is not valid configuration.",
      name: "Syntax error.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("must don't call not valid item syntax error", () => {
    const config = "C1-A-C0";
    validator.checkConfig(config);

    expect(mockErrorHandler).not.toHaveBeenCalled();
    expect(mockError).not.toHaveBeenCalled();
    expect(mockExit).not.toHaveBeenCalledWith(1);
  });
});
