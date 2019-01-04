const { jsonErrorResponse } = require("./errorResponse/errorResponse"),
  clientErrorFns = require("./errorResponse/clientErrorFns"),
  serverErrorFns = require("./errorResponse/serverErrorFns");

module.exports = {
  jsonError: options => {
    return (req, res, next) => {
      res.jsonError = jsonErrorResponse(res);
      Object.freeze(res.jsonError); //? Should we do this?
      next();
    };
  },
  jsonResponse: options => {
    return (req, res, next) => {
      //TODO: Standardize normal API responses.
      next();
    };
  },
  ...clientErrorFns,
  ...serverErrorFns
};
