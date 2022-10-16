class HttpException extends Error {
  constructor(status, message, source) {
    super();
    this.status = status;
    this.message = message;
    this.source = source;
  }
  status;
}

class AuthException extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  status;
}

module.exports = { HttpException, AuthException };
