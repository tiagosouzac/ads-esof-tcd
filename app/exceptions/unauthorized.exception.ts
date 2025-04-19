import { Exception } from "app/exceptions/exception";

class UnauthorizedException extends Exception {
  constructor(message = "You are not authorized to access this resource.") {
    super(message);
    this.name = "Unauthorized";
  }
}

export { UnauthorizedException };
