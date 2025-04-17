class UnexpectedErrorException extends Error {
  constructor(
    message = "An unexpected error occurred while processing your request."
  ) {
    super(message);
    this.name = "Unexpected Error";
  }
}

export { UnexpectedErrorException };
