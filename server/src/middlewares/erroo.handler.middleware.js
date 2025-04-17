const errorHandler = (err, req, res, next) => {
  console.log("Error", err.message);

  const status = err.status || 500;
  const message = err.message || "Interval Server Error";

  res.status(status).send({ message: err.message });
};

export default errorHandler;
