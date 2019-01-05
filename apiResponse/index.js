const { jsonErrorResponse } = require("./errorResponse/errorResponse"),
  { jsonDataResponse } = require("./dataResponse/dataResponse"),
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
  jsonData: options => {
    return (req, res, next) => {
      //TODO: Standardize normal API responses.
      res.setHeader("Content-Type", "application/vnd.api+json");
      res.jsonData = jsonDataResponse(res);
      Object.freeze(res.jsonData); //? Should we do this?
      next();
    };
  },
  api: options => {
    return (req, res, next) => {
      res.setHeader("Content-Type", "application/vnd.api+json");
      res.api = apiResponse(res);
      Object.freeze(res.api); //? Should we do this?
      next();
    };
  },
  ...clientErrorFns,
  ...serverErrorFns
};
