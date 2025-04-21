import logger from "../config/winston.config.js";

const errorHandler = (error, req, res, next) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    status: error.statusCode || 500,
    url: req.originalUrl,
    method: req.method,
  });

  if (error.isException) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  next()
};

export default errorHandler;
