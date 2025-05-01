class InternalServerErrorException {
  constructor(
    public readonly details?: string,
    public readonly statusCode = 500,
    public readonly name = "Internal Server Error",
    public readonly message = "An unexpected error occurred on the server. Please try again later."
  ) {}
}

export { InternalServerErrorException };
