import { Exception } from "core/exception";

class ForbiddenException extends Exception {
  constructor(message = "You don't have permission to access this resource") {
    super(message);
    this.name = "Forbidden";
  }
}

export { ForbiddenException };
