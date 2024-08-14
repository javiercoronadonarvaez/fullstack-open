const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  error.log(...params);
};

module.exports = { info, error };
