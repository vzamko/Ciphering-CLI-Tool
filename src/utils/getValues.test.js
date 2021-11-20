const getValues = require("./getValues");
const settings = require("../../settings");

beforeAll(() => {
  process.argv.push(
    "-c",
    "C1-C0-A-R1-R0-A-R0-R0-C1-A",
    "--config",
    "C1-C0-A-R0-R0-C1-A",
    "-i",
    settings.PROJECT_DIR + "/input.txt",
    "--input",
    settings.PROJECT_DIR + "/input.txt",
    "-o",
    settings.PROJECT_DIR + "/output.txt",
    '--output',
    settings.PROJECT_DIR + "/output.txt",
  );
});

describe('getConfig function', () => {
  test('must return correct data', () => {
    expect(getValues.getConfig('-c')).toBe('C1-C0-A-R1-R0-A-R0-R0-C1-A');
    expect(getValues.getConfig('--config')).toBe('C1-C0-A-R0-R0-C1-A');
  });
});

describe('getValue function', () => {
  test('must return correct data', () => {
    expect(getValues.getValue('-i')).toBe(settings.PROJECT_DIR + "/input.txt");
    expect(getValues.getValue('--input')).toBe(settings.PROJECT_DIR + "/input.txt");
    expect(getValues.getValue('-o')).toBe(settings.PROJECT_DIR + "/output.txt");
    expect(getValues.getValue('--output')).toBe(settings.PROJECT_DIR + "/output.txt");
  });

  test('must return null', () => {
    expect(getValues.getValue('I_love_potato')).toBeNull();
  });
});
