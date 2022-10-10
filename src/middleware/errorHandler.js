const errorHandler = (err, _req, res, _next) => {
  const { status, message } = err;

  res.status(status).json({ message });
};

module.exports = errorHandler;