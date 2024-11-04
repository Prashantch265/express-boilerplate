const isIterable = (value) => {
  return Symbol.iterator in Object(value);
};

module.exports = isIterable;
