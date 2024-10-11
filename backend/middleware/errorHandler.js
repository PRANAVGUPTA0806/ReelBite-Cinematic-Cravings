const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(constants.VALIDATION_ERROR).json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      return; // Prevent fall-through

    case constants.NOT_FOUND:
      res.status(constants.NOT_FOUND).json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      return; // Prevent fall-through

    case constants.UNAUTHORIZED:
      res.status(constants.UNAUTHORIZED).json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      return; // Prevent fall-through

    case constants.FORBIDDEN: // Added FORBIDDEN case
      res.status(constants.FORBIDDEN).json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      return; // Prevent fall-through

    case constants.SERVER_ERROR:
      res.status(constants.SERVER_ERROR).json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      return; // Prevent fall-through

    default:
      console.log("No error, All Good!!");
      res.status(500).json({
        title: "Unknown Error",
        message: "An unknown error occurred.",
      });
      return; // Prevent fall-through
  }
};

module.exports = errorHandler;
