class NotFoundException {
  constructor(
    public readonly details?: string,
    public readonly statusCode = 404,
    public readonly name = "Not Found",
    public readonly message = "The resource you are looking for could not be found. Please check the URL or contact support if the issue persists."
  ) {}
}

export { NotFoundException };
