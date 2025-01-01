const asyncErrorHandler = (handle) => (req, res, next) => {
  Promise.resolve(handle(req, res)).catch(next);
};

module.exports = asyncErrorHandler;
