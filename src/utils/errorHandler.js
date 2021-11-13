module.exports.error = (message, name) => {
  let error = {
    type: "Error",
    message: message,
    name: name,
  };

  console.error(error);
  process.exit(1);
};
