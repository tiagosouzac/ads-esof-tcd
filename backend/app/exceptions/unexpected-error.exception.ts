import { Exception } from "core/exception";

class UnexpectedErrorException extends Exception {
  constructor(
    message = "An unexpected error occurred while processing your request."
  ) {
    super(message);
    this.name = "Unexpected Error";
  }
}

export { UnexpectedErrorException };
