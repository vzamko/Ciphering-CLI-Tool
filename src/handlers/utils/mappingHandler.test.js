const mappingHandler = require('./mappingHandler');

const mapping = {
  a: "i",
  b: "j",
  c: "k",
  d: "l",
  e: "m",
  f: "n",
  g: "o",
  h: "p",
  i: "q",
  j: "r",
  k: "s",
  l: "t",
  m: "u",
  n: "v",
  o: "w",
  p: "x",
  q: "y",
  r: "z",
  s: "a",
  t: "b",
  u: "c",
  v: "d",
  w: "e",
  x: "f",
  y: "g",
  z: "h",
};

describe('MappingHandler run function:', () => {
  test('must return correct string without line break', () => {
    expect(mappingHandler.run('I love potato', mapping)).toEqual('Q twdm xwbibw' + "\n");
  });

  test('must return correct string with line break', () => {
    expect(mappingHandler.run('I love potato' + "\n", mapping)).toEqual('Q twdm xwbibw' + "\n");
  });
});