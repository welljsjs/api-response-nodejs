const StandardError = require("../models/StandardError");

const serverErrors = {
  InternalServerError: StandardError(
    500,
    "The server has encountered a situation it doesn't know how to handle"
  ),
  NotImplemented: StandardError(
    501,
    "The request method is not supported by the server and cannot be handled"
  ),
  BadGateway: StandardError(
    502,
    "Got and invalid response while working as a gateway to handle the request"
  ),
  ServiceUnavailable: StandardError(
    503,
    "The service is currently unavailable due to either maintenance or overload issues"
  ),
  //...
  HTTPVersionNotSupported: StandardError(
    505,
    "The HTTP version used in the request is not supported by the server"
  ),
  // ...
  InsufficientStorage: StandardError(
    507,
    "Internal configuration error; not enough storage available"
  )
  //...
};

module.exports = serverErrors;
