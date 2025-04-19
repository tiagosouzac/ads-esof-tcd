import { Exception } from "app/exceptions/exception";

class NotFoundException extends Exception {
  constructor(message = "The requested resource was not found.") {
    super(message);
    this.name = "Not Found";
  }
}

export { NotFoundException };
