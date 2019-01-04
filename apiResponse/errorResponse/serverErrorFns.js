const { apiErrorWrapper: wrapper } = require("./errorResponse");
let _ = require("./serverErrors");

const serverErrorFns = {
  internalServerError: wrapper(_.InternalServerError),
  notImplemented: wrapper(_.NotImplemented),
  badGateway: wrapper(_.BadGateway),
  serviceUnavailable: wrapper(_.ServiceUnavailable),
  httpVersionNotSupported: wrapper(_.HTTPVersionNotSupported),
  insufficientStorage: wrapper(_.InsufficientStorage)
};
_ = undefined;

module.exports = serverErrorFns;
