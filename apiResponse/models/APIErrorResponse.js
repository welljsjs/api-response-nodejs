const APIError = require("./APIError"),
  clientErrors = require("../errorResponse/clientErrors"),
  serverErrors = require("../errorResponse/serverErrors");

const allErrors = { ...clientErrors, ...serverErrors };

/**
 * @class APIErrorResponse
 * @classdesc How an API should return JSON errors according to https://jsonapi.org/format/1.1/#errors.
 */
class APIErrorResponse {
  getFirstStatus() {
    return (
      this._errors.find(e => {
        return !!e.status;
      }).status || 500
    );
  }
  getNormalizedStatus() {
    return this._errors.find(err => {
      return (
        Object.values(allErrors)
          .map($err => $err.status)
          .indexOf(err.status) > -1
      );
    })
      ? 400
      : 500;
  }
  get status() {
    return this._errors.length > 1
      ? this.getNormalizedStatus()
      : this.getFirstStatus();
  }
  get errors() {
    return { errors: this._errors };
  }
  set errors(errors) {
    if (!this._errors) this._errors = [];
    this.unpackErrors(errors);
  }
  unpackErrors(errors) {
    if (Array.isArray(errors)) {
      errors.forEach(e => {
        if (Array.isArray(e)) {
          e.forEach($e => {
            if (typeof $e === "object" && $e instanceof APIError)
              this._errors.push($e);
          });
        } else {
          if (typeof e === "object" && e instanceof APIError)
            this._errors.push(e);
        }
      });
    } else {
      if (typeof errors === "object" && errors instanceof APIError)
        this._errors.push(errors);
    }
  }
  constructor(errors) {
    if (!this._errors) this._errors = [];
    this.unpackErrors(errors);
  }
}

module.exports = APIErrorResponse;
