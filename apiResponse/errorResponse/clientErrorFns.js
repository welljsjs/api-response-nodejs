const { apiErrorWrapper: wrapper } = require("./errorResponse");
let _ = require("./clientErrors");

const clientErrorFns = {
  badRequest: wrapper(_.BadRequest),
  unauthorized: wrapper(_.Unauthorized),
  paymentRequired: wrapper(_.PaymentRequired),
  forbidden: wrapper(_.Forbidden),
  notFound: wrapper(_.NotFound),
  methodNotAllowed: wrapper(_.MethodNotAllowed),
  notAcceptable: wrapper(_.NotAcceptable),
  conflict: wrapper(_.Conflict),
  gone: wrapper(_.Gone),
  lengthRequired: wrapper(_.LengthRequired),
  preconditionFailed: wrapper(_.PreconditionFailed),
  requestEntityTooLarge: wrapper(_.RequestEntityTooLarge),
  uriTooLong: wrapper(_.URITooLong),
  unsupportedMediaType: wrapper(_.UnsupportedMediaType),
  unprocessableEntity: wrapper(_.UnprocessableEntity),
  tooManyRequests: wrapper(_.TooManyRequests),
  requestHeaderFieldsTooLarge: wrapper(_.RequestHeaderFieldsTooLarge)
};
_ = undefined;

module.exports = clientErrorFns;
