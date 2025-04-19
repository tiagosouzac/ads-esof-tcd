abstract class Exception extends Error {
  readonly details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "Exception";
    this.details = details;
  }
}

export { Exception };
