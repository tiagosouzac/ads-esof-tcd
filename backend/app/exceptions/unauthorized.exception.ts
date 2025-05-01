class UnauthorizedException {
  constructor(
    public readonly details?: string,
    public readonly statusCode = 401,
    public readonly name = "Unauthorized",
    public readonly message = "Access denied. You do not have the necessary permissions to access this resource."
  ) {}
}

export { UnauthorizedException };
