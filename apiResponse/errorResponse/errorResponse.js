const APIError = require("../models/APIError"),
  APIErrorResponse = require("../models/APIErrorResponse"),
  clientErrors = require("./clientErrors"),
  serverErrors = require("./serverErrors");

function apiError(status, title, message, options) {
  return new APIError(status, title, message, options);
}

function apiResponse(errors) {
  return new APIErrorResponse(errors);
}

function jsonErrorResponse(res) {
  return function(errors) {
    let apiResp = apiResponse([...arguments]);
    return res.status(apiResp.status).send(apiResp.errors);
  };
}

const allErrors = { ...clientErrors, ...serverErrors };

/* The following code is redundant: */
// const clientErrorFns = {
//   notFound: m => {
//     return clientError(404, m);
//   },
//   forbidden: m => {
//     return clientError(403, m);
//   }
// };
/* Here, all members all always functions and always (!) take
  a message to pass that to clientError(). That's redundant code.
  The solution to this issue is a wrapper: a function that returns a function: */
function apiErrorWrapper(error) {
  return options => {
    return apiError(
      error.status,
      getKeyByValue(allErrors, error).replace(/([a-z])([A-Z])/g, "$1 $2"),
      (options && options.message) || error.message,
      options
    );
  };
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = { apiErrorWrapper, jsonErrorResponse };
