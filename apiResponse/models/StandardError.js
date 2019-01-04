/**
 * @private StandardError is private and just used as an object wrapper
 * for standard errors that consist of a status and standard message.
 */
function StandardError(status, message) {
  return { status, message };
}

module.exports = StandardError;
