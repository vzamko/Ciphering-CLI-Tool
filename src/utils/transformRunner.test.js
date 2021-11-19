const transfromRunner = require('./transformRunner');
const { Readable } = require("stream");

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
const mockError = jest.spyOn(console, "error").mockImplementation(() => {});
let mockReadable;

beforeEach(() => {
  mockReadable = Readable.from(['This is secret. Message about "_" symbol!']);
});

describe('transform function:', () => {
  test('C1-C1-R0-A config', () => {
    let transformed = transfromRunner.transform(mockReadable, ['C1', 'C1', 'R0', 'A']);

    transformed.on('data', (chunk) => {
      expect(chunk).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!\n');
    })
  });

  test('C1-C0-A-R1-R0-A-R0-R0-C1-A config', () => {
    let transformed = transfromRunner.transform(mockReadable, ['C1', 'C0', 'A', 'R1', 'R0', 'A', 'R0', 'R0', 'C1', 'A']);

    transformed.on('data', (chunk) => {
      expect(chunk).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!\n');
    })
  });

  test('A-A-A-R1-R0-R0-R0-C1-C1-A config', () => {
    let transformed = transfromRunner.transform(mockReadable, ['A', 'A', 'A', 'R1', 'R0', 'R0', 'R0', 'C1', 'C1', 'A']);

    transformed.on('data', (chunk) => {
      expect(chunk).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!\n');
    })
  });

  test('C1-R1-C0-C0-A-R0-R1-R1-A-C1 config', () => {
    let transformed = transfromRunner.transform(mockReadable, ['C1', 'R1', 'C0', 'C0', 'A', 'R0', 'R1', 'R1', 'A', 'C1']);

    transformed.on('data', (chunk) => {
      expect(chunk).toBe('This is secret. Message about "_" symbol!\n');
    })
  });

  test('must be error', () => {
    transfromRunner.transform(mockReadable, ['C2']);

    expect(mockError).toHaveBeenCalledWith({
      message: 'Unknown configuration.',
      name: "Syntax error.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
