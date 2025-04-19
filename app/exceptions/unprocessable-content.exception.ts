import { Exception } from "core/exception";

class UnprocessableContentException extends Exception {
  constructor(
    message = "The request could not be processed due to semantic errors.",
    details: Record<string, unknown> = {}
  ) {
    super(message, details);
    this.name = "Unprocessable Content";
  }
}

export { UnprocessableContentException };
