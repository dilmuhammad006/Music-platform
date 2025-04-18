import logger from "../config/winston.config.js";

const errorHandler = (error, req, res, next) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    status: error.statusCode || 500,
    url: req.originalUrl,
    method: req.method,
  });

  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
