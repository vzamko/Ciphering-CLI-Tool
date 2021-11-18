module.exports.getConfig = (argv) => {
  if (argv.indexOf("-c") >= 0) {
    return this.getValue("-c");
  }

  if (argv.indexOf("--config") >= 0) {
    return this.getValue("--config");
  }
};

module.exports.getValue = (flag) => {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
};