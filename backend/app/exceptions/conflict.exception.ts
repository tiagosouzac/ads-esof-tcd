class ConflictException {
  constructor(
    public readonly details?: string,
    public readonly statusCode = 409,
    public readonly name = "Conflict",
    public readonly message = "The request could not be completed due to a conflict with the current state of the target resource. Please resolve the conflict and try again."
  ) {}
}

export { ConflictException };
