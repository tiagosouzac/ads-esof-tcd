class UnprocessableContentException {
  constructor(
    public readonly details?: Record<string, string[]>,
    public readonly statusCode = 422,
    public readonly name = "Unprocessable Content",
    public readonly message = "The request could not be processed due to semantic errors in the request body. Please review and correct the provided data."
  ) {}
}

export { UnprocessableContentException };
