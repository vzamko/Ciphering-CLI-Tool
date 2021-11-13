module.exports.run = (value, mapping) => {
  let valueArr = value.split("");

  valueArr.forEach((item, index) => {
    let isUpperCase = item.toUpperCase() === item;
    let newItem;

    newItem = mapping[item.toLowerCase()] ?? item.toLowerCase();

    if (isUpperCase) {
      newItem = newItem.toUpperCase();
    }

    valueArr[index] = newItem;
  });

  return valueArr.join("").slice(-1) === "\n"
    ? valueArr.join("")
    : valueArr.join("") + "\n";
};
