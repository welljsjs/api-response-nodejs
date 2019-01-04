const StandardError = require("../models/StandardError");

const clientErrors = {
  BadRequest: StandardError(
    400,
    "The server did not understand the request due to invalid syntax"
  ),
  Unauthorized: StandardError(
    401,
    "Authentication is needed to get requested response"
  ),
  PaymentRequired: StandardError(402, "Payment required"),
  Forbidden: StandardError(
    403,
    "You don't have permission to access the requested resource on the server"
  ),
  NotFound: StandardError(404, "Requested resource was not found"),
  MethodNotAllowed: StandardError(
    405,
    "The requested method is not allowed by the server"
  ),
  NotAcceptable: StandardError(
    406,
    "An appropriate representation of the requested resource could not be found on this server"
  ),
  // ...
  Conflict: StandardError(
    409,
    "There was a conflict while processing the request"
  ),
  Gone: StandardError(
    410,
    "The requested resource is no longer available on this server and there is no forwarding address"
  ),
  LengthRequired: StandardError(
    411,
    "Request requires a Content-Length header"
  ),
  PreconditionFailed: StandardError(
    412,
    "A specified precondition has failed for this request"
  ),
  RequestEntityTooLarge: StandardError(413, "The request entity is too large"),
  URITooLong: StandardError(414, "The requested URI is too long"),
  UnsupportedMediaType: StandardError(
    415,
    "The media format of the requested data is not supported by the server"
  ),
  // ...
  UnprocessableEntity: StandardError(
    422,
    "The request contains semantical errors"
  ),
  // ...
  TooManyRequests: StandardError(
    429,
    "Too many requests were sent in a specific amount of time"
  ),
  // ...
  RequestHeaderFieldsTooLarge: StandardError(
    431,
    "Provided header fields within the request are too large"
  )
};

module.exports = clientErrors;
