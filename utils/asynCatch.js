module.exports = (fn) => {
  return (...args) => {
    return fn(...args).catch(args[args.length - 1]);
  };
};
