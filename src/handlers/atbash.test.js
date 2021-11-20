const Atbash = require("../handlers/atbash");
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

describe('Atbash transform:', () => {
  test('must transform text', () => {
    let atbash = new Atbash();
    atbash = mockReadable.pipe(atbash).setEncoding('utf8');

    atbash.on('data', (chunk) => {
      expect(chunk).toBe('Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!\n');
    });
  });

  test('_transform function must pass without error', () => {
    let atbash = new Atbash({decoding: false});
    const mockTransform = jest.spyOn(atbash, '_transform');
    atbash._transform('', 'utf8', () => {});

    expect(mockTransform).toHaveBeenCalled();
  });

  test('must call Error', () => {
    let mockReadableWithoutUtf8 = fs.createReadStream('input.txt');
    let atbash = new Atbash();
    atbash = mockReadableWithoutUtf8.pipe(atbash);

    atbash.on('error', (e) => {
      expect(e.message).toBe('Source must be UTF-8.');
    });
  });
});