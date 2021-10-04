class SuccessResponse {
  sucess = true;
  status;
  data = [];
  message;
  source;
  description;
}

class ErrorResponse {
  constructor(message, description) {
    this.message = message;
    this.description = description;
  }
  sucess = false;
  status;
  message;
  description;
}

module.exports = { SuccessResponse, ErrorResponse };
