const controller = require('./src/controller');

jest.mock("./src/controller");

describe("Index file:", () => {
  test("must call run function", () => {
    require('./index');

    expect(controller.run).toHaveBeenCalledTimes(1);
    expect(controller.run).toHaveBeenCalled();
  });
});
