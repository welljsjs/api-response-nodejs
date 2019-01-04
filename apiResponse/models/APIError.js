/**
 * @class APIError
 * @classdesc API error with properties according to https://jsonapi.org/format/1.1/#errors.
 * @param id Unique identifier for this particular occurrence of the problem.
 * @param status The HTTP status code applicable to this problem, expressed as a string value
 * @param code An application-specific error code, expressed as a string value.
 * @param title A short, human-readable summary of the problem that __should not__ change from
 * occurrence to occurrence of the problem, except for purposes of localization.
 * @param detail A human-readable explanation specific to this occurrence of the problem.
 * Like title, this field’s value can be localized.
 * @param source An object containing references to the source of the error, optionally
 * including any of the following members:
 * @param pointer A JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the value
 * in the request document that caused the error [e.g. `"/data"` for a primary data object,
 * or `"/data/attributes/title"` for a specific attribute]. This __must__ point to a value in
 * the request document that exists; if it doesn’t, the client __should__ simply ignore the pointer.
 * @param parameter A string indicating which URI query parameter caused the error.
 * @param meta A [meta object](https://jsonapi.org/format/1.1/#document-meta) containing
 * non-standard meta-information about the error.
 */
class APIError {
  get pointer() {
    return this.source.pointer;
  }
  get parameter() {
    return this.source.parameter;
  }
  set pointer(pointer) {
    if (!this.source) this.source = {};
    this.source.pointer = pointer;
  }
  set parameter(parameter) {
    if (!this.source) this.source = {};
    this.source.parameter = parameter;
  }

  constructor(status, title, detail, options) {
    this.status = status;
    this.title = title;
    this.detail = detail;
    if (options && options.pointer) this.pointer = options.pointer;
    if (options && options.parameter) this.parameter = options.parameter;
    // Ignore all other options.
  }
}

module.exports = APIError;
