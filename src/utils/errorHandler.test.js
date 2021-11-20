const errorHandler = require('./errorHandler');

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
const mockError = jest.spyOn(console, "error").mockImplementation(() => {});

describe('error function', () => {
  test('must return correct message, name and type', () => {
    const data = {
      'name': 'Test type.',
      'message': 'Test message.',
    };

    errorHandler.error(data.message, data.name)

    expect(mockError).toHaveBeenCalledWith({
      message: 'Test message.',
      name: "Test type.",
      type: "Error",
    });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});