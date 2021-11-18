const index = require('./index');
const controller = require('./src/controller');

jest.mock('./src/controller');

describe('Index file:', () => {
  test('must call run function', () => {
    expect(controller.run).toHaveBeenCalledTimes(1);
    expect(controller.run).toHaveBeenCalled();
  });
});